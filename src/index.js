import "dotenv/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { initializeApp } from "firebase-admin/app";
import mongoose from "mongoose";
import admin from "firebase-admin";
import DataLoader from "dataloader";
import { schema } from "./schemas";
import { resolvers } from "./resolvers";
import * as models from "./models";
import { getRequestor } from "./context";
import {
  getPostsFavoritedByRequestor,
  getPostsFavoritesCount,
  getUsers,
} from "./loaders";

function getFirebassApp() {
  if (admin.apps.length === 0) {
    initializeApp({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      serviceAccountId: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    });
  }
  return admin.apps[0];
}

const app = express();
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const firebaseApp = getFirebassApp();
    const requestor = await getRequestor(req, firebaseApp, models);

    return {
      models,
      firebaseApp,
      requestor,
      loaders: {
        postsFavoritedByRequestor: new DataLoader((keys) =>
          getPostsFavoritedByRequestor(keys, models, requestor)
        ),
        postsFavoritesCounts: new DataLoader((keys) =>
          getPostsFavoritesCount(keys, models)
        ),
        creators: new DataLoader((userIds) => getUsers(userIds, models)),
      },
    };
  },
});

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  await mongoose.connect(
    `${process.env.MONGO_DB_PROTOCOL_SCHEME}://${
      process.env.MONGO_DB_USERNAME
    }:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${
      process.env.MONGODB_CNXN_PARAMS || ""
    }`,
    {
      dbName: process.env.MONGO_DB_DATABASE_NAME,
    }
  );
  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `Apollo Server on http://localhost:${process.env.PORT}/graphql`
    );
  });
}

startServer();
