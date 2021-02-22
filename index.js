const express = require('express'),
      app     = express()
      cors    = require('cors')
 
const docx = require("docx");
const fs = require('fs')
const mongoose = require('mongoose')
const { Job } = require('./Model');

const { Document, Packer, Paragraph, Table, TextRun, TableRow, TableCell, } = require("docx");
const { trimSmartfromString } = require('./trimSmarFromString');
const { NONAME } = require('dns');
const { ResumeToken } = require('mongodb');
const puppeteer = require('puppeteer');
const { linkfetcher } = require("./linkFetcher");
// const { jobFetcherController } = require("./jobFetcherController");
const { jobFetcher } = require("./jobFetcer");
const { jobFetcherController } = require("./jobFetcherController");
const port = 2000;


// mongoose.connect('mongodb+srv://kleekit:KleekVoremKarma2020@vorem.zly4i.mongodb.net/vorem?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// });


app.use(cors())
app.get('/page', async (req,res)=> {
    try {
        const links = await linkfetcher('https://www.myjobmag.com/page/1')
        const result = [];
    for (let i = 1; i < 2; i++) {
        // l
        console.log(` wonking on this ${links[i]}`)
        const job = await jobFetcher(links[i])
        // create mongodb
        result.push(job)

    }

        res.json({links, result });

    } catch (error) {
        res.json({error:false, msg: 'something went wrong'})
    }

})

// (async()=>{
//     const links = await linkfetcher('https://www.myjobmag.com/page/1')
//     // const result = await jobFetcherController(jobFetcher, links, 3)
//     // const result = jobFetcherController(jobFetcher, links, 1)
//     const result = [];
//     for (let i = 1; i < 2; i++) {
//         // l
//         console.log(` wonking on this ${links[i]}`)
//         const job = await jobFetcher(links[i])
//         // create mongodb
//         result.push(job)

//     }
//     console.log(result)
// })()




// const { methodOfApplication } = require('./methodOfapplication');
// const {methodOfApplication} = require('./methodOfapplication')






// methodOfApplication('https://www.myjobmag.com','/apply-now/262569' )
// console.log()




// poppeteer starts here

// 

// (async () => {
//     try{
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://www.myjobmag.com/page/1');
//         //*[@id="read-content-wrap"]/div/div[1]/ul/li[1]/ul/li[1]/h1

//         // // other actions...
//         // let newJobs
//         // result = await page.evaluate(() => {
//         //     let job = document.querySelectorAll('#job-date')
//         //     return [...job].map(async(cur, index) => {
//         //         if (cur != null && cur.textContent.includes('20') ) {
//         //         await page.goto(document.querySelectorAll('.job-info h2> a')[index].href, { waitUntil: 'networkidle2' });
//         //         await page.pdf({ path: `${index}.pdf`, format: 'A4' });
//         //         }
//         //     })
//         // })
//         await browser.close();
//     }catch(e){
//         console.log(e)
//     }
   
// })();
// const pickExperience(string)=>{
//     const x = [...string]
//     x.map((cur,index) => {
//         if(Number(cur) != NaN){
//          return x[index]
//         }
//     })
// }

const findQualification = (string) => {
    const q = ['HND', 'BSc', 'OND', 'SSCE', 'MSc']
    let degree;
    q.map((cur, index) => {
        if (string.includes(cur)) {
            degree = q[index]
        } else {
            degree = 'Any'
        }
    })
    return degree
}


// async function methodOfApplicationMultiply (num){
//     let links = document.
//     for (let i = 0; i < num; i++) {
        
        
//     }
// }
async function buildParagraph(arrayOfArrayOfStrings){
    let newArray = []
    newArray.push(arrayOfArrayOfStrings.map((cur,index) => {
        let stringArray = []
        let lastEscape = 0;
        let currentEscape
        [...cur[0]].map((curString,stringIndex)=> { 
            if (curString == '\n') {
                currentEscape = stringIndex
                // console.log(currentEscape)
                stringArray.unshift(cur[0].slice(lastEscape, currentEscape))
                // stringArray.unshift(new Paragraph(cur[0].slice(lastEscape, currentEscape)))
                lastEscape = stringIndex + 1;
            }
        })
        return stringArray;
    }))
     return newArray
}






app.listen(port, ()=> console.log(` connected to port : ${port}`))


   


 