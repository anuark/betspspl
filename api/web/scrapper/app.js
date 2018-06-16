const puppeteer = require('puppeteer');
const fs = requier('fs');
const http = require('http');

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
    await page.screenshot({path: 'example.png'});
    let bodyHtml = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    fs.writeFile(`/tmp/${Date.now()}".html`, bodyHtml, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    })
})().catch((reason) => {
    console.log(reason);
});

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     getHtml().then((v) => {
//         res.end(v);
//     });
// });

// server.listen(3000, 'localhost');
