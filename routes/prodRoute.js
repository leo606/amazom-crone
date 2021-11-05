const express = require("express");
const route = express.Router();
const products = require("../middlewares/products");

route.get("/", products.getProducts);
route.post("/", products.postProduct);

module.exports = route;
