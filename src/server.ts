import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { WalmartItem, RequestBody } from './constants';
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')

dotenv.config();

const app: Express = express();
const PORT : number = 5000;

app.get('/express_backend/:querystring', async (req: Request, res: Response) => {
    res.send(await scrapeWalmart(req.params.querystring));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


async function scrapeWalmart(query: string): Promise<WalmartItem[]> {

    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({ headless: "new", executablePath: executablePath() });
    const page = await browser.newPage();

    await page.goto(`https://www.walmart.com/search?q=${query}`, {
        waitUntil: "domcontentloaded",
    });

    const items = await page.evaluate(() => {
      const itemRoot : Element | null = document.querySelector('div[data-stack-index="0"]');
      if (itemRoot == null) {
        throw new Error();
      }
      const itemChildren = itemRoot.querySelectorAll('.sans-serif.mid-gray.relative.flex.flex-column.w-100.hide-child-opacity');

      return Array.from(itemChildren).map((item) : WalmartItem => {
        const title = item.querySelector('.w_iUH7');
        const price = item.querySelector('div[data-testid="list-view"]')?.querySelector('.w_iUH7');
        const image = item.querySelector('img')?.getAttribute('src');
        const urlLink = item.querySelector('a')?.getAttribute('href');

        return {
              title: (title != null) ? (title as HTMLElement).innerText : undefined,
              price: (price != null) ? (price as HTMLElement).innerText : undefined,
              image: (image != null) ? image : undefined,
              urlLink: (urlLink != null) ? "https://www.walmart.com/" + urlLink : undefined
            };
    });
    });
    await browser.close();
    return items;
}
