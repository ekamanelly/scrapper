const puppeteer = require('puppeteer');
const docx = require("docx");
const fs = require('fs')
const { Document, Packer, Paragraph, Table, TextRun, TableRow, TableCell, } = require("docx");
const { trimSmartfromString } = require('./trimSmarFromString');
// const { methodOfApplication } = require('./methodOfapplication');
// const {methedOfApplication} = require('./methodOfapplication')




// methedOfApplication('https://www.myjobmag.com','/apply-now/262569' )
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
        return result2
    } catch (e) {
        console.log(e)
    }
};
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
                stringArray.unshift(new Paragraph(cur[0].slice(lastEscape, currentEscape)))
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







(async () => { 
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let url = 'https://www.myjobmag.com/jobs/internal-controls-manager-west-africa-at-mondelez-international-llc-cadbury-nigeria-plc-1'
        await page.goto(url);
        // let mainJobName , jobMailAddress, jobUrlAddress, Type, companyProfile; 
        // let [el] = await page.$x('//*[@id="printable"]/text()')
        // let text = el.getProperty('text')
        // methedOfApplication(url)
         

        result = await page.evaluate(() => {
            let description = document.querySelector('#printable').textContent
            let signIndex = document.querySelector('#printable').textContent.search("Signup Now");
            let readMoreIndex = document.querySelector('#printable').textContent.search("Read more about this company");
            let moaResult = document.querySelector('div.mag-b:nth-child(11) > p:nth-child(1) > strong:nth-child(1)')?
                document.querySelector('#printable div.mag-b p strong').textContent: 'can\'t find email';
            let nodesJobsDetails = [...document.querySelectorAll('.job-details')]
            // return nodesJobsDetails.length;
            let text = []
            if(nodesJobsDetails.length>0){
                for (var i = 0; i < nodesJobsDetails.length; i++) {
                    text.push([document.querySelectorAll('.job-details')[i].textContent])
                    // text.push('top')
                }

            } else {
                text.push([document.querySelector('.job-details').textContent])
                // text.push('rop')

            }
            
           return( {
               mainJobName: `Job at ${document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1]}`,
               companyName: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1],
               industry: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li.job-industry > a:nth-child(1)').textContent,
             
               qulification: document.querySelector('.job-key-info > li:nth-child(2) > span:nth-child(2) > a:nth-child(1)') ? document.querySelector('.job-key-info > li:nth-child(2) > span:nth-child(2) > a:nth-child(1)').textContent: 'Any',
               experience: document.querySelector('.job-key-info > li:nth-child(3) > span:nth-child(2)').textContent,
               location: document.querySelector('.job-key-info > li:nth-child(4) > span:nth-child(2) > a:nth-child(1)').textContent,
               companyDescription: description.slice(signIndex + 10, readMoreIndex), 
               jobTitle: document.querySelector('.subjob-title').textContent,
               jobDetails: text,
               methedOfApplication: moaResult.includes('@') ? moaResult : document.querySelector('#printable div.mag-b a').href, 
               deadliine: document.querySelector('div.read-date-sec-li:nth-child(2)').textContent,
           })
          
        })

        


        // console.log(result)
        if (!result.methedOfApplication.includes('@')) {
            console.log('I can\'t find their email, I will get the link sunday')
            result.methedOfApplication = await methodOfApplication(result.methedOfApplication)
        }

        let [formatedParagraph] = await buildParagraph(result.jobDetails)
        console.log(formatedParagraph)
     

        const doc = new Document();
        const nestedTable = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Job Title")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Degree Type")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Degree Grade")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Faculty")],
                        }),
                        new TableCell({
                            children: [new Paragraph("State")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Experience")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Course")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Job Description")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Job Mail Address")],
                        }), 
                        new TableCell({
                            children: [new Paragraph("Job url Address")],
                        }),
                    ],

                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(result.jobTitle)]
                        }),
                        new TableCell({
                            children: [new Paragraph(result.qulification)]
                        }),
                        new TableCell({
                            children: [new Paragraph('Any')]
                        }),
                        new TableCell({
                            children: [],
                        }),
                        new TableCell({
                            children: [new Paragraph(result.location)],
                        }),
                        new TableCell({
                            children: [new Paragraph(result.experience.replace('years', ''))],
                        }),
                        new TableCell({
                            children: [new Paragraph('Not Specified')],
                        }),
                        new TableCell({
                            children: formatedParagraph[0],
                        }),
                        new TableCell({
                            children: result.methedOfApplication.includes('@') ? [new Paragraph(result.methedOfApplication)]: [],
                        }),
                        new TableCell({
                            children: result.methedOfApplication.includes('@') ? [] : [new Paragraph(result.methedOfApplication)],
                        }),

                    ],
                }),

            ]
        })

        const table = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Job Name")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Company Name")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Company Website")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Email Address")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Industry")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Job Mail Address")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Job url Address")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Type")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Company Profile")],
                        }),
                    ],

                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(result.mainJobName)]
                        }),
                        new TableCell({
                            children: [new Paragraph(result.companyName)]
                        }),
                        new TableCell({
                            children: []
                        }),
                        new TableCell({
                            children: [],
                        }),
                        new TableCell({
                            children: [new Paragraph(result.industry)],
                        }),
                        new TableCell({
                            children: result.methedOfApplication.includes('@') ? [new Paragraph(result.methedOfApplication)] : [],
                        }),
                        new TableCell({
                            children: result.methedOfApplication.includes('@') ? [] : [new Paragraph(result.methedOfApplication)],
                        }),

                        new TableCell({
                            children: result.methedOfApplication.includes('@') ? [new Paragraph('2')] : [new Paragraph('3')] ,
                        }),
                        new TableCell({
                            children: [new Paragraph(result.companyDescription), new Paragraph('Read more about this company')],
                        }),

                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: []
                        }),
                        new TableCell({
                            children: []
                        }),
                        new TableCell({
                            children: []
                        }),
                        new TableCell({
                            columnSpan: 8,
                            children: [nestedTable]
                        }),
                    ],
                }),


            ],


        });

        doc.addSection({
            children: [table],
        });
        let fileName = result.companyName + ' ' + result.deadliine.replace('Deadline:', '')
        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(`${fileName}.docx`, buffer);
        });

        console.log(result.jobTitle)
        console.log(result)
        console.log(result.deadliine)
        await browser.close();
    } catch (e) {
        console.log(e)
    }

})();




// console.log(findQualification('/MSC/gsD'))
