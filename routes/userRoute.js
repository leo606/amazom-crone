const express = require("express");
const { checkUser, addUser } = require("../middlewares/user");

const route = express.Router();

route.post("/", checkUser, addUser);

module.exports = route;
