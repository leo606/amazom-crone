const express = require("express");
const { isValid, checkout, sendEmail } = require("../middlewares/checkout");
const { erroRes } = require("../middlewares/error");

const route = express.Router();

route.post("/", isValid, checkout, sendEmail);
route.use(erroRes);

module.exports = route;
