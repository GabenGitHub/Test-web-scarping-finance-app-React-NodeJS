const puppeteer = require('puppeteer');

const stocksArray = [];

async function scrapeData(url, id) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const symbolSelector = await page.waitForSelector('.stocks__symbol');
        const symbolTxt = await symbolSelector.getProperty('textContent');
        const ticker = await symbolTxt.jsonValue();

        const priceSelector = await page.waitForSelector('.stocks__quote');
        const priceTxt = await priceSelector.getProperty('textContent');
        const price = await priceTxt.jsonValue();

        const changeSelector = await page.waitForSelector('.stocks__change');
        const changeTxt = await changeSelector.getProperty('textContent');
        const change = await changeTxt.jsonValue();

        const changePercentSelector = await page.waitForSelector('.stocks__change-pct');
        const changePercentTxt = await changePercentSelector.getProperty('textContent');
        const changePercent = await changePercentTxt.jsonValue();

        // console.log({ ticker, price, change, changePercent });
        stocksArray.push({ id, ticker, price, change, changePercent });

        await browser.close();

    } catch (error) {
        console.error(error)
    }

};

const microsoft = 'https://duckduckgo.com/?q=MSFT&t=ffab&ia=stock';
const google = 'https://duckduckgo.com/?q=GOOG&t=ffab&ia=stock';
const apple = 'https://duckduckgo.com/?q=AAPL&t=ffab&ia=stock';
const tesla = 'https://duckduckgo.com/?q=TSLA&t=ffab&ia=stock';

scrapeData(microsoft, 1);
scrapeData(google, 2);
scrapeData(apple, 3);
scrapeData(tesla, 4);

// setTimeout(() => {
//     console.log(stocksArray)
// }, 8000);

module.exports = stocksArray;