const Products = require("../model/Products");

async function getProducts(req, res, next) {
  try {
    const products = await Products.getAll();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
}

async function postProduct(req, res, next) {
  const { name, price, color } = req.body;
  try {
    const inserted = await Products.createProduct({ name, price, color });
    res.status(200).json(inserted);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getProducts, postProduct };
