import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { 
    WalmartItem,
    SupplementaryInfo,
    NutritionFacts,
    NutritionFactsNode,
    NUTRITION_OPTIONS,
} from './constants';
import { BrowserEdge } from 'react-bootstrap-icons';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { executablePath } = require('puppeteer')

dotenv.config();

const app: Express = express();
const PORT : number = 3001;

app.get('/express_backend/:querystring', async (req: Request, res: Response) => {
    res.send(await scrapeWalmart(req.params.querystring));
});

app.get('/fetch_item_lists/:querystring', async (req: Request, res: Response) => {
    res.send(await scrapeWalmartList(req.params.querystring));
})

app.get('/fetch_detailed_items/:querystring', async (req: Request, res: Response) => {
    console.log(req.params.querystring.split("|"));
    res.send(await scrapeWalmartItems(req.params.querystring));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

async function scrapeWalmart(query: string): Promise<WalmartItem[]> {

    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() });
    const page = await browser.newPage();

    await page.goto(`https://www.walmart.com/search?q=${query}&sort=price_low`, {
        waitUntil: "domcontentloaded",
    });

    const items = await page.evaluate(() => {
        /* Helpers */
        const extractPrice = (price: string | null | undefined) : string | undefined => {
            const matches = price?.match(/(\$\d+\.\d+)/);
            return (matches) ? matches[1] : undefined;
        };   

        const parseSearchResults = (itemRoot: Element) => {
            const itemChildren = itemRoot.querySelectorAll('.sans-serif.mid-gray.relative.flex.flex-column.w-100.hide-child-opacity');
        
            return Array.from(itemChildren).map((item) : WalmartItem => {
              const title = item.querySelector('.w_iUH7');
              const price = item.querySelector('div[data-testid="list-view"]')?.querySelector('.w_iUH7');
              const image = item.querySelector('img')?.getAttribute('src');
              const urlLink = item.querySelector('a')?.getAttribute('href');
        
              return {
                    title: (title != null) ? (title as HTMLElement | null)?.innerText : undefined,
                    price: (price != null) ? extractPrice((price as HTMLElement | null)?.innerText) : undefined,
                    image: (image != null) ? image : undefined,
                    urlLink: (urlLink != null) ? "https://www.walmart.com" + urlLink : undefined
                  };
          });
        };
        /* End of Helpers */

        const itemRoot : Element | null = document.querySelector('div[data-stack-index="0"]');
        if (itemRoot == null) {
            throw new Error();
        };
        return parseSearchResults(itemRoot);
    });
    await browser.close();
    return items;
}

async function scrapeWalmartList(querylist: string): Promise<WalmartItem[][]> {
    const itemList = querylist.split("_");
    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() });
    const items = await Promise.all(
        itemList.map(async (item) => {
            const page = await browser.newPage();
            await page.goto(`https://www.walmart.com/search?q=${item}&sort=price_low`);
            return await page.evaluate(() => {
                /* Helpers */
                const extractPrice = (price: string | null | undefined) : string | undefined => {
                    const matches = price?.match(/(\$\d+\.\d+)/);
                    return (matches) ? matches[1] : undefined;
                };

                const parseSearchResults = (itemRoot: Element) => {
                    const itemChildren = itemRoot.querySelectorAll('.sans-serif.mid-gray.relative.flex.flex-column.w-100.hide-child-opacity');
        
                    return Array.from(itemChildren).map((item) : WalmartItem => {
                        const title = item.querySelector('.w_iUH7');
                        const price = item.querySelector('div[data-testid="list-view"]')?.querySelector('.w_iUH7');
                        const image = item.querySelector('img')?.getAttribute('src');
                        const urlLink = item.querySelector('a')?.getAttribute('href');
        
                        return {
                            title: (title != null) ? (title as HTMLElement | null)?.innerText : undefined,
                            price: (price != null) ? extractPrice((price as HTMLElement | null)?.innerText) : undefined,
                            image: (image != null) ? image : undefined,
                            urlLink: (urlLink != null) ? "https://www.walmart.com" + urlLink : undefined
                        };
                    });
                };
                /* End of Helpers */

                const itemRoot : Element | null = document.querySelector('div[data-stack-index="0"]');
                if (itemRoot == null) {
                    throw new Error();
                };
                return parseSearchResults(itemRoot);
            });
        }));
    await browser.close();
    return items;
}

async function scrapeWalmartItems(urls: string) : Promise<SupplementaryInfo[]> {
    const urlList = urls.split("|");
    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() });
    const items = await Promise.all(
        urlList.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url, {
                waitUntil: "domcontentloaded",
            });
            return await page.evaluate((NUTRITION_LIST: string[]) => {

                /* Helpers */
                const parseNutritionTable = (table: HTMLTableElement | null) : NutritionFactsNode[] => {
                    if (table == null) return [];
                    const rows = table.querySelectorAll('tr');
                    return Array.from(rows).map((row: HTMLTableRowElement): NutritionFactsNode | undefined => {
                        const cells = row.querySelectorAll('td');
                        if (!cells || Array.from(cells).length < 2) return;
                        const nutritionRegex = new RegExp("(" + NUTRITION_LIST.join("|") + ")");
                        const matches = cells[0].innerHTML.match(nutritionRegex);
                        if (matches == null) return;
                        const nutritionType = matches[1];
                        const amount = cells[0].querySelector(".ml2")?.innerHTML;
                        const percentage = cells[1].innerText;
                        const toReturn : NutritionFactsNode = {
                            name: nutritionType,
                            amount: amount,
                            percentDailyValue: (new RegExp("\d+(\.\d*)?\%").test(percentage)) ? percentage : undefined
                        };
                        return toReturn;
                    }).filter(x => x != null).map(x => x!);
                };

                const parseNutritionSection = (nutritionSection: Element | null) : NutritionFacts | undefined => {
                    if (nutritionSection == null) return;
                    const servings = nutritionSection.querySelector('.mid-gray.lh-copy.ttl.mv1');
                    const servingsPerContainer = (servings != null) ? (servings as HTMLElement).innerText : undefined;
                    const servingSizeObj = (nutritionSection
                        ).querySelector('.flex.justify-between.dark-gray.mv1.b.lh-copy'
                        )?.querySelectorAll('span');
                    const servingSize = (servingSizeObj != null) ? (servingSizeObj[1] as HTMLElement).innerText : undefined;
                    const caloriesObj = (nutritionSection
                        ).querySelector('.flex.justify-between.bb.lh-copy.b.f2.bw2.pb1'
                        )?.querySelectorAll('span');
                    const calories = (caloriesObj != null) ? (caloriesObj[1] as HTMLElement).innerText : undefined;
                    const tableInfo = parseNutritionTable(nutritionSection.querySelector('table'));
                    const toReturn : NutritionFacts = {
                        facts: tableInfo,
                        servingsPerContainer: servingsPerContainer,
                        servingSize: servingSize,
                        calories: calories
                    };
                    return toReturn;
                };

                const parseBuyBox = (buyBox: Element | null) => {
                    if (buyBox == null) return undefined;
                    const reviewBox = buyBox.querySelector('div[data-testid="reviews-and-ratings"]');
                    if (reviewBox != null) {
                        const rating : string | undefined = (reviewBox.querySelector(
                            ".f7.rating-number") as HTMLElement)?.innerText?.replaceAll(/[\(\)]/g, "");
                        const numReviews : string | undefined = (reviewBox.querySelector(
                            'a[data-testid="item-review-section-link"]') as HTMLElement)?.innerText;
                        return {
                            rating,
                            numReviews
                        };
                    }
                    return undefined;
                };
                
                const parseProductSection = (productSection : Element | null) : string | undefined => {
                    if (productSection == null) return;
                    return (productSection.querySelector('.dangerous-html.mb3') as (HTMLElement))?.innerText;
                };
                /* End of Helpers */

                const nutritionSection : Element | null = document.querySelector('.w_wOcC.w_EjQC');
                const nutrition = parseNutritionSection(nutritionSection);
                const buyBox : Element | null = document.querySelector('.buy-box-column');
                const buyInfo = parseBuyBox(buyBox);
                const productSection : Element | null = document.querySelector('div[data-testid="product-description-content"]');
                const productInfo = parseProductSection(productSection);
                const toReturn: SupplementaryInfo = {
                    nutritionFacts: nutrition,
                    rating: buyInfo?.rating ?? "Missing",
                    numReviews: buyInfo?.numReviews ?? "Missing",
                    description: productInfo ?? "Missing"
                };
                return toReturn;
            }, NUTRITION_OPTIONS);
        }));
    await browser.close();
    return items;
    };