const connection = require("./connection");

async function getAll() {
  try {
    const db = await connection();
    const categories = await db.collection("categories").find().toArray();
    return categories;
  } catch (e) {
    console.log(e);
  }
}

async function createCategorie(categorie) {
  try {
    const db = await connection();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getAll };
