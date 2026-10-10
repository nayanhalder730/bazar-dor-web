import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const MONGODB_URI = process.env.MONGODB_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL is missing");
}

if (!BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

if (!BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is missing");
}

const client = new MongoClient(MONGODB_URI);
const db = client.db("bazar-dor-web");

export const auth = betterAuth({
  appName: "Bazar Dor",
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});