const puppeteer = require('puppeteer');
const http = require('http');

const getHtml = (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
    await page.screenshot({path: 'example.png'});
    let bodyHtml = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    return bodyHtml;
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    getHtml().then((v) => {
        res.end(v);
    });
});

server.listen(3000, 'localhost');
