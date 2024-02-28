const express = require('express');
const path = require('path');
const cors = require('cors')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
// const {buildSchema} = require('graphql');
// const {createYoga} = require('graphql-yoga');
const {loadFilesSync} = require('@graphql-tools/load-files')
const {makeExecutableSchema} = require('@graphql-tools/schema')

// const schemaText = `
// type Query{
//     products: [Product]
//     order: [Order]
// }
// `;

const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql'))
const resolverArray = loadFilesSync(path.join(__dirname,'**/*.resolvers.js'))

async function startApolloServer(){
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs:typesArray,
        resolvers:resolverArray,
    })

    const server = new ApolloServer({
        schema
    })

    await server.start()

    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));
    app.listen(3001, () =>{
        console.log('Running graphql server')
    });
}

// const typesArray = loadFilesSync('**/*',{
//     extentions: ['graphql'],
// })
// const resolverArray = loadFilesSync('**/*',{
//     extensions: ['resolvers.js'],
// })


// const schema = buildSchema(`
//     type Query{
//         products: [Product]
//         order: [Order]
//     }
//     type Product{
//         id: ID!
//         description: String!
//         reviews: [Review]
//         price: Float!
//     }
//     type Review{
//         Rating: Int!
//         Comment: String
//     }
//     type Order{
//         date: String!
//         subtotal: Float!
//         item: [OrderItem]
//     }
//     type OrderItem{
//         product: Product!
//         quantity: Int!
//     }
// `);

// const app = express();

// app.use('/graphql',createYoga({
//     schema:schema,
//     graphiql:true,
// }));

// app.use('/graphql', createYoga({
//     schema: schema,
// }));

// app.use('/graphql', () =>{});

// app.listen(3000, () =>{
//     console.log('Running graphql server')
// });

startApolloServer();