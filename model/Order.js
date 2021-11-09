const connection = require("./connection");

async function insert(order) {
  try {
    const db = await connection();
    const inserted = await db.collection("orders").insertOne(order);
    return { id: inserted.insertedId };
  } catch (e) {
    console.log(e);
  }
}

module.exports = { insert };
