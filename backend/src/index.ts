import express from 'express';
import { ApolloServer  } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser'
import cors from 'cors'

import sequelize from './config/db';
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

async function startServer(){
    const app = express();

    const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await server.start();

        app.use(
            '/graphql',
            cors<cors.CorsRequest>(),
            bodyParser.json(),
            expressMiddleware(server)
        );

        try{
            await sequelize.authenticate();
            console.log("Connected to DB");
        }catch{
            console.error('Error connecting DB: ', error)
        }

        app.listen(4000, () =>{
            console.log("Server at http://localhost:4000/graphql");
        })
}

startServer();