const express = require("express");
const { isValid, genToken, loginPost } = require("../middlewares/login");
const { erroRes } = require("../middlewares/error");

const route = express.Router();

route.post("/", isValid, genToken, loginPost);
route.use(erroRes);

module.exports = route;
