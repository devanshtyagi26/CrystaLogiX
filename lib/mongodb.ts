import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

const globalWithMongo = global as typeof global & {
  _mongoClient?: MongoClient;
};

function getClient(): MongoClient {
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri);
  }
  return globalWithMongo._mongoClient;
}

export async function getDb() {
  const client = getClient();
  await client.connect(); // no-op if already connected
  return client.db("bandgap");
}