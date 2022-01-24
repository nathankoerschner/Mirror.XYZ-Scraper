
const { https } = require('follow-redirects')
// need to use follow-redirects since areweave tx id requests return url of the data

const reqData = async function(id){

    let fetched = {};
    const options = {
        hostname: 'arweave.net',
        port: 443,
        path: `/${id}`,
        method: 'GET',
        followAllRedirects: true

      }
      
      const req = await https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log('headers:', res.headers);
      
        res.on('data', d => {
            //return JSON.parse(d.toString())
            console.log(JSON.parse(d.toString()));
            fetched = JSON.parse(d.toString());
        })

      })
      req.on('error', error => {
        console.error(error)
      })
      
      req.end()

      return fetched
}

export { reqData }