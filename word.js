
const { Document, Packer, Paragraph, Table, TextRun, TableRow, TableCell, } = require("docx");

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
                    children: result.methedOfApplication.includes('@') ? [new Paragraph(result.methedOfApplication)] : [],
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
                    children: result.methedOfApplication.includes('@') ? [new Paragraph('2')] : [new Paragraph('3')],
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