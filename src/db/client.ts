import "server-only";
import { MongoClient } from "mongodb";
import { env } from "@/lib/env";

const globalMongo = globalThis as typeof globalThis & {
  __kianaMongoClient?: MongoClient;
  __kianaMongoUri?: string;
};

export const mongoClient =
  globalMongo.__kianaMongoUri === env.MONGODB_URI &&
  globalMongo.__kianaMongoClient
    ? globalMongo.__kianaMongoClient
    : new MongoClient(env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
      });

if (process.env.NODE_ENV !== "production") {
  globalMongo.__kianaMongoClient = mongoClient;
  globalMongo.__kianaMongoUri = env.MONGODB_URI;
}

// Never rely on the database embedded in the URI: it can name a legacy authSource.
export const db = mongoClient.db(env.MONGODB_DB);
