const fs = require('fs')
const { https } = require('follow-redirects')
// need to use follow-redirects since areweave tx id requests return url of the data

const reqData = async function(id){

    let fetched = {};
    const options = {
        hostname: 'arweave.net',
        port: 443,
        path: `/${id}`,
        method: 'GET',
        followAllRedirects: true,
        agent: false

      } // end options
      
      const req = https.request(options, async res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log('headers:', res.headers);
      
        res.on('data', d => {
            //return JSON.parse(d.toString())
            fetched = d.toString();
            fs.writeFileSync(`data/${id}.json`, JSON.stringify(d.toString()))
        })

      }) // end request callback

      req.on('error', error => {
        console.log("current ID is: ", options.path)
        console.error(error)

      })
      
      req.end()
}

function httpsRequest(params, postData) {
  return new Promise(function(resolve, reject) {
      var req = https.request(params, function(res) {
          // reject on bad status
          if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          // cumulate data
          var body = [];
          res.on('data', function(chunk) {
              body.push(chunk);
          });
          // resolve on end
          res.on('end', function() {
              try {
                  body = JSON.parse(Buffer.concat(body).toString());
              } catch(e) {
                  reject(e);
              }
              resolve(body);
          });
      });
      // reject on request error
      req.on('error', function(err) {
          // This is not a "Second reject", just a different sort of failure
          reject(err);
      });
      if (postData) {
          req.write(postData);
      }
      // IMPORTANT
      req.end();
  });
}


module.exports =  { reqData, httpsRequest }