const { app } = require("@azure/functions");
const { getDatabase } = require("../db/mongoClient");

app.http("GetMovies", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const database = await getDatabase(process.env.MONGODB_ATLAS_DATABASE);
      const collection = database.collection(process.env.MONGODB_ATLAS_COLLECTION);
      const results = await collection.find({}).limit(10).toArray();

      context.log(typeof results);
      return {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ length: results.length, result: results }),
      };
    } catch (error) {
      return {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: error.toString(),
        }),
      };
    }
  },
});
