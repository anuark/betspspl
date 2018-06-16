const puppeteer = require('puppeteer');
const fs = require('fs');
// const http = require('http');
const { exec } = require('child_process');
var browser;

(async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
    await page.screenshot({path: 'example.png'});
    let bodyHtml = await page.evaluate(() => document.body.innerHTML);
    await browser.close();

    let filePath = `/tmp/${Date.now()}.html`;
    fs.writeFile(filePath, bodyHtml, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        exec(`php /var/www/betspspl/yii scrapping/parse ${filePath}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log('success');
        });
    })
})().catch((reason) => {
    browser.close();
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
