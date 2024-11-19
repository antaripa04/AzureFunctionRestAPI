const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_ATLAS_URI, {
  tls: true,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
});

async function getDatabase(databaseName) {
  await client.connect();
  console.log("Connected successfully to server");
  return client.db(databaseName);
}

module.exports = {
  getDatabase,
};
