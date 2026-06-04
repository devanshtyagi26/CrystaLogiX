import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

// Reuse connection across hot reloads in dev
const globalWithMongo = global as typeof global & {
  _mongoClient?: MongoClient;
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

export async function getDb() {
  await client.connect();
  return client.db("bandgap");
}