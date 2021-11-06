const connection = require("./connection");

async function create(user) {
  try {
    const db = await connection();
    const inserted = await db.collection("users").insertOne(user);
    return { id: inserted.insertedId };
  } catch (e) {
    console.log(e);
  }
}

module.exports = { create };
