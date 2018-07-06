const puppeteer = require('puppeteer');
const fs = require('fs');
// const http = require('http');
const { exec } = require('child_process');
var browser;

(async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    // await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/15737/Fixtures/International-FIFA-World-Cup-2018');
    // await page.screenshot({path: 'example.png'});
    // let groupStage = await page.evaluate(() => document.body.innerHTML);

    // await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/12759/Fixtures/International-FIFA-World-Cup-2018');
    // let round16 = await page.evaluate(() => document.body.innerHTML);

    await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/12760/Fixtures/International-FIFA-World-Cup-2018');
    let quarter = await page.evaluate(() => document.body.innerHTML);

    // await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/12761/Fixtures/International-FIFA-World-Cup-2018');
    // let semiFinal = await page.evaluate(() => document.body.innerHTML);

    // await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/12761/Fixtures/International-FIFA-World-Cup-2018');
    // let bronze = await page.evaluate(() => document.body.innerHTML);

    // await page.goto('https://www.whoscored.com/Regions/247/Tournaments/36/Seasons/5967/Stages/12762/Fixtures/International-FIFA-World-Cup-2018');
    // let final = await page.evaluate(() => document.body.innerHTML);

    await browser.close();

    let sources = [
        // groupStage,
        // round16,
        quarter,
        // semiFinal,
        // bronze,
        // final
    ];

    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];

        let filePath = `/tmp/${Date.now()}_${i}.html`;
        fs.writeFile(filePath, source, function (err) {
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
        });
    }
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
