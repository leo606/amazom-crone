const express = require("express");
const { isValid, checkout } = require("../middlewares/checkout");
const { erroRes } = require("../middlewares/error");

const route = express.Router();

route.post("/", isValid, checkout);
route.use(erroRes);

module.exports = route;
