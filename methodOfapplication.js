const puppeteer = require('puppeteer');
const docx = require("docx");
const fs = require('fs')

module.exports.methodOfApplication = async function (url){
        try {
            const browser2 = await puppeteer.launch();
            const page2 = await browser2.newPage();
            await page2.goto(url);


           const result2 = await page2.evaluate(() => {
                return link = window.location.href
            })
            console.log(result2)
        } catch (e) {
            console.log(e)
        }  

}