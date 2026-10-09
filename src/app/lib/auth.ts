
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const client = new MongoClient(MONGODB_URI);

const db = client.db("bazar-dor");

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    client,
  }),
});