const express = require("express");
const { valid, exists, addUser } = require("../middlewares/user");
const { erroRes } = require("../middlewares/error");

const route = express.Router();

route.post("/", valid, exists, addUser);
route.use(erroRes);

module.exports = route;
