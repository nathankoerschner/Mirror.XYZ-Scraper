const fs = require ('fs')
const reqData = require('./request.js')



var array = fs.readFileSync('mirrorTickets.csv', 'utf-8')
    .split('\n')
    .map(line => line.split(","));

const fetchData = async () =>{
    let promises = array.map( async x => {

    });
    
    for await (const val of promises){
        console.log(val.response);
    }
}

fetchData()