const { MongoClient } = require("mongodb");

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = "mongodb://localhost:27017";

let db = null;

function connection() {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_URL, OPTIONS).then((conn) => {
        db = conn.db("amazom");
        return db;
      });
}

module.exports = connection;
