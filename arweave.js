const { request, gql, GraphQLClient } = require('graphql-request')
const fs = require('fs');
const { findSourceMap } = require('module');
const { resourceLimits } = require('worker_threads');
const endpoint = 'https://arweave.net/graphql'


const requestData = async (startBlock, step) => {
    const stopBlock = startBlock + step;
    let toReturn = [];

    let query = gql`
    {
        transactions(first:100, block: {min:${startBlock}, max:${stopBlock}}, tags: {name: "App-Name", values: "MirrorXYZ"}) {
            edges {
            cursor
                node {
                    id
                    tags{
                        name
                        value
                    }
                }
            }
        }
    }
    `


    await request(endpoint, query).then( (data) => {
        if (data.transactions.edges){
            amount = Object.keys(data.transactions.edges).length
            console.log("found " + amount + " tickets matching the query")
            toReturn = data.transactions.edges;
        } else {
            console.log("No transactions found.");
            toReturn = [];
        }
    })
    return toReturn;
    
}




const findAll = async (startBlock, endBlock, step) => {
    startBlock = 550000;
    endBlock = 750000;// 
    step = 1000;
    results = [];

    currentBlock = startBlock
    while (currentBlock < endBlock) {
            console.log("\n\n\n Current Block is ", currentBlock);
            await requestData(currentBlock, step).then((data) => {
                results = results.concat(data);
            });
        currentBlock += step;
    }

    console.log(results)
    let jsonData = JSON.stringify(results);
    fs.writeFileSync(`blocks_${startBlock}_to_${endBlock}.json`, jsonData);
}

findAll(550000, 750000, 1000); // first Arweave transaction is at 559678, 751000 is where they get dense
findAll(750000, 900000, 100)