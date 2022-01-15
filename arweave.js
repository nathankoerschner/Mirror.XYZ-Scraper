const { request, gql, GraphQLClient } = require('graphql-request')
const fs = require('fs');
const endpoint = 'https://arweave.net/graphql'


const requestData = async (startCursor) => {
    let txs = [];
    let cursor = null
    let query = gql`
        {
            transactions(first:100, after: "${startCursor}", tags: {name: "App-Name", values: "MirrorXYZ"}) {
                edges {
                cursor
                    node {
                        id
                    }
                }
            }
        }
        `
    await request(endpoint, query).then( (data) => {
        for (let i = 0; i < 100; i++){
            txs.push(data.transactions.edges[i].node.id) // data.transactions.edges
            
            if (i == 99) { // if there was a full page of data gathered
                cursor =  data.transactions.edges[i].cursor;
            }
        }
    })
    return { txs, cursor } 
    
}

// TODO: create a paginator, which fires requestData() once, and then repeats it with the cursor of the last one, until cursor is null.

const loadData = async () => {
    const finalData = await requestData("")

    let jsonData = JSON.stringify(finalData["txs"]);
    fs.writeFileSync("data.json", jsonData);
}

loadData()
