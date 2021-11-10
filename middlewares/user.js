const joi = require("joi");
const User = require("../model/User");

const joiUserSchema = joi.object().keys({
  user: joi.string().alphanum().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});

function valid(req, res, next) {
  const { user, email, password, firstName, lastName } = req.body;
  const valid = joiUserSchema.validate({
    user,
    email,
    password,
    firstName,
    lastName,
  });

  if (valid.error) {
    return next({
      error: {
        status: 402,
        code: "userNotValid",
        message: valid.error.message,
      },
    });
  }
  req.userValid = valid.value;
  next();
}

async function exists(req, _res, next) {
  const { user } = req.userValid;
  try {
    const filterUser = await User.getUserByUsername(user);
    if (filterUser) {
      return next({
        error: {
          status: 409,
          code: "userAlredyExists",
          message: "user already exists in the DB",
        },
      });
    }
    return next();
  } catch (e) {
    console.log(e);
  }
}

async function addUser(req, res, next) {
  const user = req.userValid;
  try {
    const inserted = await User.create(user);
    return res.status(201).json(inserted);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { valid, exists, addUser };
