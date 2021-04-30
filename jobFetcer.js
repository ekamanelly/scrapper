const puppeteer = require('puppeteer');





module.exports.jobFetcher =async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        await page.goto(url, { waitUntil: 'load', timeout: 0 });

        result = await page.evaluate(() => {
            let description = document.querySelector('#printable').textContent
            let signIndex = document.querySelector('#printable').textContent.search("Signup Now");
            let readMoreIndex = document.querySelector('#printable').textContent.search("Read more about this company");
            let moaResult = document.querySelector('#printable div.mag-b p strong') ?
                (() => {
                    let email = document.querySelector('#printable div.mag-b p strong').textContent;
                    if (email.includes('@')) {
                        return {
                            type: 'email', note: document.querySelector('#printable div.mag-b p strong').textContent
                        }
                    } else {
                        return { type: 'error', note: `Makeup had no email, saw '${email}' instead` }

                    }



                })()
                :
                document.querySelector('.application-links') ?

                    (() => {
                        let x = {
                            type: 'multipleLink', note: []
                        }
                        for (let i = 0; i < document.querySelector(".application-links").childElementCount; i++) {
                            console.log(document.querySelector(".application-links").childElementCount)
                            let selector = `.application-links > li:nth-child(${i + 1}) > a:nth-child(1)`
                            x.note.push(document.querySelector(selector).href)
                        }
                        return x;

                    })()
                    : document.querySelector('#printable div.mag-b a') ? {
                        type: 'singleLink', note: [document.querySelector('#printable div.mag-b a').href]
                    } : {
                            type: 'error', note: "Error: No means to apply"
                        };


            let nodesJobsDetails = [...document.querySelectorAll('.job-details')]
            'div.mag-b:nth-child(11) > a:nth-child(1)'
            // // return nodesJobsDetails.length;
            let text = []
            let qualifications = []
            let experience = []
            let location = []
            let jobTItles = []
            //
            if (nodesJobsDetails.length > 0) {
                for (var i = 0; i < nodesJobsDetails.length; i++) {
                    text.push([document.querySelectorAll('.job-details')[i].textContent])
                    qualifications.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(2) span:nth-child(2)').textContent)
                    experience.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(3) > span:nth-child(2)').textContent)
                    location.push(document.querySelectorAll('.job-key-info')[i].querySelector('li:nth-child(4) > span:nth-child(2)').textContent)
                    jobTItles.push(document.querySelectorAll('.subjob-title')[i].textContent)

                    '#job265607 > a:nth-child(1)'

                }

            } else {
                text.push([document.querySelector('.job-details').textContent])
            }






            return ({
                mainJobName: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1') && `Job at ${document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1]}`,
                companyName: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1') && document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li:nth-child(1) > h1').textContent.split(' at ')[1],
                industry: document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li.job-industry > a:nth-child(1)') && document.querySelector('#read-content-wrap > div > div.read-left-section > ul > li.read-head > ul > li.job-industry > a:nth-child(1)').textContent,

                qulification: qualifications,
                experience: experience,
                location: location,
                companyDescription: description.slice(signIndex + 10, readMoreIndex),
                jobTitle: jobTItles,
                jobDetails: text,
                methodOfApplication: moaResult
            })

        })
        // const result2 =  await findLinks(result)

        if (result.methodOfApplication.type === "multipleLink" || result.methodOfApplication.type == 'singleLink') {
            let correctLink = []
            for (link of result.methodOfApplication.note) {
                const page2 = await browser.newPage();
                await page2.goto(link, { waitUntil: 'load', timeout: 0 })
                const url = page2.url();
                correctLink.push(url.split('_source')[0])
                await page2.close();
            }


            result.methodOfApplication['correctLink'] = correctLink;
        }





        // let [formatedParagraph] = await buildParagraph(result.jobDetails)
        // result.jobDetails = formatedParagraph;
        await browser.close();
        console.log('all good')
        return result
        // await browser.close();
    } catch (e) {
        //fetch the next job
        console.log(e)
    }

};


// getJob('https://www.myjobmag.com/jobs/equity-lead-at-palladium-group').then(x => console.log(x))