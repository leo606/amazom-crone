const connection = require("./connection");
const { ObjectId } = require("mongodb");

async function getAll() {
  try {
    const db = await connection();
    const categories = await db.collection("categories").find().toArray();
    return categories;
  } catch (e) {
    console.log(e);
  }
}

async function getCategoryByName(name) {
  try {
    const db = await connection();
    const category = await db.collection("categories").findOne({name});
    return category;
  } catch (e) {
    console.log(e);
  }
}

async function getCategoryById(id) {
  try {
    const db = await connection();
    const category = await db.collection("categories").findOne(new ObjectId(id));
    return category;
  } catch (e) {
    console.log(e);
  }
}

async function createCategorie(name) {
  try {
    const db = await connection();
    const inserted = await db.collection("categories").insertOne({ name });
    return { id: inserted.insertedId };
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getAll, getCategoryByName, createCategorie };
