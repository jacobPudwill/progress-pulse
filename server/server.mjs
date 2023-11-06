import 'dotenv/config';
import { readFileSync } from "fs";
import path from 'path';
import express from 'express';
import cors from 'cors';
import gql from "graphql-tag";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';

import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';
import resolvers from "./schemas/resolvers.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors(),
  express.json(),
  express.urlencoded({ extended: false })
);

const typeDefs = gql(
  readFileSync("./server/schemas/typeDefs.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context: authMiddleware
});

const startApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server),
  );

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
