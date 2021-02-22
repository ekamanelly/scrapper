



module.exports.jobFetcherController = async (jobFetcher, links, stopAtIndex, startAtIndex= 0) =>{
    const fetchedjobs = []
    for (let i = startAtIndex; i < stopAtIndex; i++) {
         const job = await jobFetcher(links[i])
         // create mongodb
         fetchedjobs.push(job)

    }
    return {fetchedjobs,links}
}