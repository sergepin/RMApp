import express from 'express';
import { ApolloServer  } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser'
import cors from 'cors'

import sequelize from './config/db';
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import { requestLogger, errorLogger, setLoggerEnabled } from './middleware/logger';

// Import models and initialize associations
import { initializeAssociations } from './models/init';

async function startServer(){
    // Initialize model associations
    initializeAssociations();

    const app = express();

    const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await server.start();

        app.use(requestLogger);
        
        app.use(cors<cors.CorsRequest>());
        app.use(bodyParser.json());

        // GraphQL endpoint
        app.use(
            '/graphql',
            expressMiddleware(server)
        );

        app.use(errorLogger);

        try{
            await sequelize.authenticate();
            console.log("Connected to DB");
        }catch{
            console.error('Error connecting DB: ', Error)
        }

        app.listen(4000, () =>{
            console.log("🚀 GraphQL Server running at http://localhost:4000/graphql");
        })
}

startServer();