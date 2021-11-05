const express = require("express");
const route = express.Router();
const categories = require("../middlewares/categories");
const errorHandler = require("../middlewares/error");

route.get("/", categories.getCategories);

route.post(
  "/",
  categories.isCategoryValid,
  categories.postCategory,
  errorHandler.erroRes
);

module.exports = route;
