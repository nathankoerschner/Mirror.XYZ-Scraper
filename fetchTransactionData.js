const fs = require ('fs')
const { reqData } = require('./request.js')
const util = require('util')

const waitForPromise = async (promised, continuation = () => true)=>{

  let interval = setInterval(()=>{
    let pending = util.inspect(promised).includes("pending");
    if (!pending) { 
        clearInterval(interval)
        continuation();
     }
  },1000)
}

const fetchData = async (array) =>{
    let maxIterations= 2;
    if (array.length < maxIterations){
        maxIterations = array.length;
    } 

    for (i = 0; i < maxIterations; i++) {
        let promised = reqData(array[i][1]);
        if (i == maxIterations-1){
            waitForPromise(promised, () => {
                array.splice(0, maxIterations);
                fetchData(array);
            })
        }
    }
}


const run = async () => {
    var ticketArray = fs.readFileSync('mirrorTickets.csv', 'utf-8')
    .split('\n')
    .map(line => line.split(","));

    fetchData(ticketArray)
}

run()


