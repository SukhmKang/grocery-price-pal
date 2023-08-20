"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var constants_1 = require("./constants");
var puppeteer = require('puppeteer-extra');
var StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
var executablePath = require('puppeteer').executablePath;
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 3001;
app.get('/express_backend/:querystring', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, scrapeWalmart(req.params.querystring)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('/fetch_item_lists/:querystring', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, scrapeWalmartList(req.params.querystring)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get('/fetch_detailed_items/:querystring', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(req.params.querystring.split("|"));
                _b = (_a = res).send;
                return [4 /*yield*/, scrapeWalmartItems(req.params.querystring)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(PORT));
});
function scrapeWalmart(query) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: "new", executablePath: executablePath() })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://www.walmart.com/search?q=".concat(query, "&sort=price_low"), {
                            waitUntil: "domcontentloaded",
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            /* Helpers */
                            var extractPrice = function (price) {
                                var matches = price === null || price === void 0 ? void 0 : price.match(/(\$\d+\.\d+)/);
                                return (matches) ? matches[1] : undefined;
                            };
                            var parseSearchResults = function (itemRoot) {
                                var itemChildren = itemRoot.querySelectorAll('.sans-serif.mid-gray.relative.flex.flex-column.w-100.hide-child-opacity');
                                return Array.from(itemChildren).map(function (item) {
                                    var _a, _b, _c;
                                    var title = item.querySelector('.w_iUH7');
                                    var price = (_a = item.querySelector('div[data-testid="list-view"]')) === null || _a === void 0 ? void 0 : _a.querySelector('.w_iUH7');
                                    var image = (_b = item.querySelector('img')) === null || _b === void 0 ? void 0 : _b.getAttribute('src');
                                    var urlLink = (_c = item.querySelector('a')) === null || _c === void 0 ? void 0 : _c.getAttribute('href');
                                    return {
                                        title: (title != null) ? title === null || title === void 0 ? void 0 : title.innerText : undefined,
                                        price: (price != null) ? extractPrice(price === null || price === void 0 ? void 0 : price.innerText) : undefined,
                                        image: (image != null) ? image : undefined,
                                        urlLink: (urlLink != null) ? "https://www.walmart.com" + urlLink : undefined
                                    };
                                });
                            };
                            /* End of Helpers */
                            var itemRoot = document.querySelector('div[data-stack-index="0"]');
                            if (itemRoot == null) {
                                throw new Error();
                            }
                            ;
                            return parseSearchResults(itemRoot);
                        })];
                case 4:
                    items = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _a.sent();
                    return [2 /*return*/, items];
            }
        });
    });
}
function scrapeWalmartList(querylist) {
    return __awaiter(this, void 0, void 0, function () {
        var itemList, browser, items;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemList = querylist.split("_");
                    return [4 /*yield*/, puppeteer.launch({ headless: "new", executablePath: executablePath() })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, Promise.all(itemList.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var page;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, browser.newPage()];
                                    case 1:
                                        page = _a.sent();
                                        return [4 /*yield*/, page.goto("https://www.walmart.com/search?q=".concat(item, "&sort=price_low"))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, page.evaluate(function () {
                                                /* Helpers */
                                                var extractPrice = function (price) {
                                                    var matches = price === null || price === void 0 ? void 0 : price.match(/(\$\d+\.\d+)/);
                                                    return (matches) ? matches[1] : undefined;
                                                };
                                                var parseSearchResults = function (itemRoot) {
                                                    var itemChildren = itemRoot.querySelectorAll('.sans-serif.mid-gray.relative.flex.flex-column.w-100.hide-child-opacity');
                                                    return Array.from(itemChildren).map(function (item) {
                                                        var _a, _b, _c;
                                                        var title = item.querySelector('.w_iUH7');
                                                        var price = (_a = item.querySelector('div[data-testid="list-view"]')) === null || _a === void 0 ? void 0 : _a.querySelector('.w_iUH7');
                                                        var image = (_b = item.querySelector('img')) === null || _b === void 0 ? void 0 : _b.getAttribute('src');
                                                        var urlLink = (_c = item.querySelector('a')) === null || _c === void 0 ? void 0 : _c.getAttribute('href');
                                                        return {
                                                            title: (title != null) ? title === null || title === void 0 ? void 0 : title.innerText : undefined,
                                                            price: (price != null) ? extractPrice(price === null || price === void 0 ? void 0 : price.innerText) : undefined,
                                                            image: (image != null) ? image : undefined,
                                                            urlLink: (urlLink != null) ? "https://www.walmart.com" + urlLink : undefined
                                                        };
                                                    });
                                                };
                                                /* End of Helpers */
                                                var itemRoot = document.querySelector('div[data-stack-index="0"]');
                                                if (itemRoot == null) {
                                                    throw new Error();
                                                }
                                                ;
                                                return parseSearchResults(itemRoot);
                                            })];
                                    case 3: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 2:
                    items = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, items];
            }
        });
    });
}
function scrapeWalmartItems(urls) {
    return __awaiter(this, void 0, void 0, function () {
        var urlList, browser, items;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlList = urls.split("|");
                    return [4 /*yield*/, puppeteer.launch({ headless: "new", executablePath: executablePath() })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, Promise.all(urlList.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
                            var page;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, browser.newPage()];
                                    case 1:
                                        page = _a.sent();
                                        return [4 /*yield*/, page.goto(url, {
                                                waitUntil: "domcontentloaded",
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, page.evaluate(function (NUTRITION_LIST) {
                                                var _a, _b;
                                                /* Helpers */
                                                var parseNutritionTable = function (table) {
                                                    if (table == null)
                                                        return [];
                                                    var rows = table.querySelectorAll('tr');
                                                    return Array.from(rows).map(function (row) {
                                                        var _a;
                                                        var cells = row.querySelectorAll('td');
                                                        if (!cells || Array.from(cells).length < 2)
                                                            return;
                                                        var nutritionRegex = new RegExp("(" + NUTRITION_LIST.join("|") + ")");
                                                        var matches = cells[0].innerHTML.match(nutritionRegex);
                                                        if (matches == null)
                                                            return;
                                                        var nutritionType = matches[1];
                                                        var amount = (_a = cells[0].querySelector(".ml2")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                                                        var percentage = cells[1].innerText;
                                                        var toReturn = {
                                                            name: nutritionType,
                                                            amount: amount,
                                                            percentDailyValue: (new RegExp("\d+(\.\d*)?\%").test(percentage)) ? percentage : undefined
                                                        };
                                                        return toReturn;
                                                    }).filter(function (x) { return x != null; }).map(function (x) { return x; });
                                                };
                                                var parseNutritionSection = function (nutritionSection) {
                                                    var _a, _b;
                                                    if (nutritionSection == null)
                                                        return;
                                                    var servings = nutritionSection.querySelector('.mid-gray.lh-copy.ttl.mv1');
                                                    var servingsPerContainer = (servings != null) ? servings.innerText : undefined;
                                                    var servingSizeObj = (_a = (nutritionSection).querySelector('.flex.justify-between.dark-gray.mv1.b.lh-copy')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('span');
                                                    var servingSize = (servingSizeObj != null) ? servingSizeObj[1].innerText : undefined;
                                                    var caloriesObj = (_b = (nutritionSection).querySelector('.flex.justify-between.bb.lh-copy.b.f2.bw2.pb1')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('span');
                                                    var calories = (caloriesObj != null) ? caloriesObj[1].innerText : undefined;
                                                    var tableInfo = parseNutritionTable(nutritionSection.querySelector('table'));
                                                    var toReturn = {
                                                        facts: tableInfo,
                                                        servingsPerContainer: servingsPerContainer,
                                                        servingSize: servingSize,
                                                        calories: calories
                                                    };
                                                    return toReturn;
                                                };
                                                var parseBuyBox = function (buyBox) {
                                                    var _a, _b, _c;
                                                    if (buyBox == null)
                                                        return undefined;
                                                    var reviewBox = buyBox.querySelector('div[data-testid="reviews-and-ratings"]');
                                                    if (reviewBox != null) {
                                                        var rating = (_b = (_a = reviewBox.querySelector(".f7.rating-number")) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.replaceAll(/[\(\)]/g, "");
                                                        var numReviews = (_c = reviewBox.querySelector('a[data-testid="item-review-section-link"]')) === null || _c === void 0 ? void 0 : _c.innerText;
                                                        return {
                                                            rating: rating,
                                                            numReviews: numReviews
                                                        };
                                                    }
                                                    return undefined;
                                                };
                                                var parseProductSection = function (productSection) {
                                                    var _a;
                                                    if (productSection == null)
                                                        return;
                                                    return (_a = productSection.querySelector('.dangerous-html.mb3')) === null || _a === void 0 ? void 0 : _a.innerText;
                                                };
                                                /* End of Helpers */
                                                var nutritionSection = document.querySelector('.w_wOcC.w_EjQC');
                                                var nutrition = parseNutritionSection(nutritionSection);
                                                var buyBox = document.querySelector('.buy-box-column');
                                                var buyInfo = parseBuyBox(buyBox);
                                                var productSection = document.querySelector('div[data-testid="product-description-content"]');
                                                var productInfo = parseProductSection(productSection);
                                                var toReturn = {
                                                    nutritionFacts: nutrition,
                                                    rating: (_a = buyInfo === null || buyInfo === void 0 ? void 0 : buyInfo.rating) !== null && _a !== void 0 ? _a : "Missing",
                                                    numReviews: (_b = buyInfo === null || buyInfo === void 0 ? void 0 : buyInfo.numReviews) !== null && _b !== void 0 ? _b : "Missing",
                                                    description: productInfo !== null && productInfo !== void 0 ? productInfo : "Missing"
                                                };
                                                return toReturn;
                                            }, constants_1.NUTRITION_OPTIONS)];
                                    case 3: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 2:
                    items = _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, items];
            }
        });
    });
}
;
