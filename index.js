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


async function buildParagraph(arrayOfArrayOfStrings) {
    let newArray = []
    newArray.push(arrayOfArrayOfStrings.map((cur, index) => {
        let stringArray = []
        let lastEscape = 0;
        let currentEscape
        [...cur[0]].map((curString, stringIndex) => {
            if (curString == '\n') {
                currentEscape = stringIndex
                // console.log(currentEscape)
                // stringArray.unshift(cur[0].slice(lastEscape, currentEscape))
                stringArray.unshift(new Paragraph(cur[0].slice(lastEscape, currentEscape)))
                lastEscape = stringIndex + 1;
            }
        })
        return stringArray;
    }))
    // console.log(newArray)
     return newArray
}

// buildParagraph()


const doscBuilder = async (doscObj) => {
    const result = await jobFetcher('https://www.myjobmag.com/jobs/job-opportunities-at-zeta-technologies-nigeria-limited')
    console.log(result);
    // console.log(result.methodOfApplication)
    let [formatedParagraph]  = await buildParagraph(result.jobDetails);
    console.log(formatedParagraph)

    let ray = ['s', 'x', 'd'];
     let ro =[
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
     ]
    formatedParagraph.map((cur,index)=> {
         ro.push(
            new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph(result.jobTitle[index])]
                }),
                new TableCell({
                    children: [new Paragraph(result.qulification[index])]
                }),
                new TableCell({
                    children: [new Paragraph('Any')]
                }),
                new TableCell({
                    children: [],
                }),
                new TableCell({
                    children: [new Paragraph(result.location[index])],
                }),
                new TableCell({
                    children: [new Paragraph(result.experience[index])],
                }),
                new TableCell({
                    children: [new Paragraph('Not Specified')],
                }),
                new TableCell({
                    children: formatedParagraph[index],
                }),
                new TableCell({
                    children: result.methodOfApplication.type == 'email' ? [new Paragraph(result.methodOfApplication.note)] : [],
                }),
                new TableCell({
                    children: result.methodOfApplication.type == 'email' ? [] : [new Paragraph(result.methodOfApplication.note)],
                    // children:  [new Paragraph('sedrtf')],
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
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                        // children:  [new Paragraph('sedrtf')],
                    }),

                ],
            })
        
        )

    })     

    // for(x of ray){
       

    // }


    const doc = new Document();
    const nestedTable = new Table({
        rows: ro
       
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
                        children: result.methodOfApplication.type == 'email'  ? [new Paragraph(result.methodOfApplication.note)] : [],
                    }),
                    new TableCell({
                        children: result.methodOfApplication.type == 'email' ? [] : [new Paragraph(result.methodOfApplication.note)],
                    }),

                    new TableCell({
                        children: result.methodOfApplication.type == 'email' ? [new Paragraph('2')] : [new Paragraph('3')],
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
    // let fileName = result.companyName + ' ' + result.deadliine.replace('Deadline:', '')
    let fileName = result.companyName
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`test.docx`, buffer);
    });

}
doscBuilder();

// const findQualification = (string) => {
//     const q = ['HND', 'BSc', 'OND', 'SSCE', 'MSc']
//     let degree;
//     q.map((cur, index) => {
//         if (string.includes(cur)) {
//             degree = q[index]
//         } else {
//             degree = 'Any'
//         }
//     })
//     return degree
// }









app.listen(port, ()=> console.log(` connected to port : ${port}`))


   


 