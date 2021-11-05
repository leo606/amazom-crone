const express = require("express");
const route = express.Router();
const products = require("../middlewares/products");
const errorHandler = require("../middlewares/error");

route.get("/", products.getProducts);
route.post("/", products.isValid, products.postProduct, errorHandler.erroRes);

module.exports = route;
