const puppeteer = require('puppeteer');
const docx = require("docx");
const fs = require('fs')
const mongoose = require('mongoose')
const { Job } = require('./Model');

const { Document, Packer, Paragraph, Table, TextRun, TableRow, TableCell, } = require("docx");
const { trimSmartfromString } = require('./trimSmarFromString');


mongoose.connect('mongodb+srv://kleekit:KleekVoremKarma2020@vorem.zly4i.mongodb.net/vorem?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
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

async function methodOfApplication (url) {
    try {
        const browser2 = await puppeteer.launch();
        const page2 = await browser2.newPage();
        await page2.goto(url);

        const result2 = await page2.evaluate(() => {
            return link = window.location.href.split('_source')[0]
        })
        console.log(result2)
        browser2.close()
        return result2
    } catch (e) {
        console.log(e)
    }
};
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

// async function JobDetails (nodesList){
//     // let nodes = document.querySelectorAll('.job-details');
//     let elems = [...nodesList]
//     let text = []
//     console.log(nodes)

//     for (var i = 0; i < elems.length; i++) {

//         text.push([document.querySelectorAll('.job-details')[i].textContent])
//     }
//     return text  
// }







async function getJob (url) { 
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // 'https://www.myjobmag.com/jobs/wpe-case-management-assistant-at-international-rescue-committee'
        // let url = 'https://www.myjobmag.com/jobs/fresh-jobs-at-michael-stevens-consulting-9'
        let url = 'https://www.myjobmag.com/jobs/latest-vacancies-at-the-international-rescue-committee-irc-20'
        'https://www.myjobmag.com/jobs/latest-vacancies-at-the-international-rescue-committee-irc-20'
        // let url = 'https://www.myjobmag.com/jobs/wpe-case-management-assistant-at-international-rescue-committee'
        await page.goto(url);
        // let mainJobName , jobMailAddress, jobUrlAddress, Type, companyProfile; 
        // let [el] = await page.$x('//*[@id="printable"]/text()')
        // let text = el.getProperty('text')
        // methodOfApplication(url)
        result = await page.evaluate(() => {
            let description = document.querySelector('#printable').textContent
            let signIndex = document.querySelector('#printable').textContent.search("Signup Now");
            let readMoreIndex = document.querySelector('#printable').textContent.search("Read more about this company");
            let moaResult = document.querySelector('#printable div.mag-b p strong')?
                { type: 'email', note: document.querySelector('#printable div.mag-b p strong').textContent  } : 
                document.querySelector('.application-links') ? 
                
                (()=>{
                        let x =  {
                            type: 'multipleLink', note: []
                        } 
                    for (let i = 0; i < document.querySelector(".application-links").childElementCount; i++) {
                        let selector = `.application-links > li:nth-child(1) > a:nth-child(1)`
                        x.note.push(document.querySelector(selector).href)
                        
                    }
                    return x;

                })()
                : document.querySelector('#printable div.mag-b a') ? {
                        type: 'singleLink', note: document.querySelector('#printable div.mag-b a').href
                    } : {
                type: 'error', note: "Error: No means to apply"
            }  ;


            let nodesJobsDetails = [...document.querySelectorAll('.job-details')]
            'div.mag-b:nth-child(11) > a:nth-child(1)'
            // // return nodesJobsDetails.length;
            let text = []
            let qualifications = []
            let experience = []
            let location = []
            let jobTItles =[]
            //
            if(nodesJobsDetails.length>0){
                for (var i = 0; i < nodesJobsDetails.length; i++) {
                    text.push([document.querySelectorAll('.job-details')[i].textContent])
                    qualifications.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(2) span:nth-child(2)').textContent)
                    experience.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(3) > span:nth-child(2)').textContent)
                    location.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(4) > span:nth-child(2)').textContent)
                    jobTItles.push(document.querySelectorAll('.subjob-title')[i].textContent)

                    '#job265607 > a:nth-child(1)'

                    // text.push('top')
                }

            } else {
                text.push([document.querySelector('.job-details').textContent])
                // text.push('rop')

            }
            // if(!moaResult){
            //     for (var i = 0; i < nodesJobsDetails.length; i++) {

            //      }

            // }
           
           
            
           return( {
               mainJobName: `Job at ${document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1]}`,
               companyName: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1],
               industry: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li.job-industry > a:nth-child(1)').textContent,
             
               qulification: qualifications,
               experience: experience ,
               location: location,
               companyDescription: description.slice(signIndex + 10, readMoreIndex), 
               jobTitle: jobTItles,
               jobDetails: text,
               methodOfApplication: moaResult
            //    deadliine: document.querySelector('div.read-date-sec-li:nth-child(2)').textContent,
           })
          
        })
        // console.log(result.methodOfApplication)
        // if (result.methodOfApplication.type == 'multipleLink') {
        //     console.log('multipleLink')
         
        //         let correctedLinks = [];
        //    result.methodOfApplication.note.map(async(cur,index)=>{
        //     result.methodOfApplication.note = await methodOfApplication(result.methodOfApplication.note[0])

                    
        //         })
        //     // result.methodOfApplication.note =await methodOfApplication(result.methodOfApplication.note[0])

                   
        // }else if(result.methodOfApplication.type == 'singleLink'){

        //     console.log('single')
        //     console.log(result.methodOfApplication)
        //     // console.log(typeof [])
        //     result.methodOfApplication.note = await methodOfApplication(result.methodOfApplication.note)
        //     console.log('splet wrong')
        // }
        // console.log(result.methodOfApplication)
        // console.log(result.methodOfApplication)
        // console.log(alLink)

        let [formatedParagraph] = await buildParagraph(result.jobDetails)
        result.jobDetails = formatedParagraph;
     

        // console.log(result)
        
        await browser.close();
        return result;
    } catch (e) {
        console.log(e)
    }

};



(async() => {
    let job = await  getJob()
    console.log('second function ')
    job.methodOfApplication.note.map(async (cur, index) => {
        job.methodOfApplication.note = await methodOfApplication(job.methodOfApplication.note[0])


    })
    console.log(job)

})()
// let job = getJob()
// console.log(job)




// console.log(findQualification('/MSC/gsD'))
