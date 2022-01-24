const request = require("request");
const fs = require ('fs')

let id = "FQpnEGufbaR0nrLiOzcKCigrwb1GtEFjZwIEnst7xNw";

const fetchTicketData = (ticketId)=>{
    let options = {
        method: 'GET',
        url: `https://arweave.net/${ticketId}/data`
       };
       
       request(options, function (error, response, body) { 
         if (error){
          console.error(error); 
         }
         //console.log('Arweave network height is: ' + JSON.parse(body).height);
         //console.log(body)
         return(JSON.parse(body))
       });
}


var output = fs.readFileSync('mirrorTickets.csv', 'utf-8')
    .split('\n')
    .map(line => line.split(","))
    .reduce((id, line) => {

    }, [])

console.log(output)
//https://www.youtube.com/watch?v=1DMolJ2FrNY&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=4 going off of this to try and learn .reduce()