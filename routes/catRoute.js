const express = require("express");
const route = express.Router();
const categories = require("../middlewares/categories");

route.get("/", categories.getCategories);

route.post(
  "/",
  categories.isCategoryValid,
  categories.postCategory,
  categories.erroRes
);

module.exports = route;
