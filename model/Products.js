const connection = require("./connection");

async function getAll() {
  try {
    const db = await connection();
    const products = await db.collection("products").find().toArray();
    return products;
  } catch (e) {
    console.log(e);
  }
}

async function createProduct(product) {
  try {
    const db = await connection();
    const inserted = await db.collection("products").insertOne(product);
    return { id: inserted.insertedId };
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getAll, createProduct };
