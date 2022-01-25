const fs = require ('fs')
const { reqData, httpsRequest } = require('./request.js')




const fetchData = async (array) =>{

    let promises = array.map( async x => {
        setTimeout(()=>reqData(x[1]), 1000)
        return
    });
}

const run = async () => {
    var ticketArray = fs.readFileSync('mirrorTickets.csv', 'utf-8')
    .split('\n')
    .map(line => line.split(","));

    fetchData(ticketArray)
}

run()

