const { model } = require("mongoose");

const puppeteer = require('puppeteer');

module.exports.linkfetcher = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    result = await page.evaluate(() => {

        let nodes = document.querySelectorAll('li.job-info h2 > a ')

        let elems = [...nodes]
        let text = []




        for (var i = 0; i < elems.length; i++) {

            text.push(document.querySelectorAll('li.job-info h2 > a')[i].href)
        }
        return text
    })

    await browser.close();
    console.log(result)
    return result;

}