const joi = require("joi");
const { getUserByUsername } = require("../model/User");

const joiLoginSchema = joi.object().keys({
  user: joi.string().alphanum().required(),
  password: joi.string().min(6).max(16).required(),
});

async function isValid(req, _res, next) {
  const { user, password } = req.body;
  const valid = joiLoginSchema.validate({ user, password });
  if (valid.error) {
    return next({
      error: { status: 402, code: "invalidUser", message: valid.error.message },
    });
  }
  try {
    const userSaved = await getUserByUsername(user);
    if (!userSaved)
      return next({
        error: {
          status: 404,
          code: "invalidUser",
          message: "username not found",
        },
      });
    if (userSaved.password !== password)
      return next({
        error: {
          status: 403,
          code: "invalidPassword",
          message: "incorrect password or username",
        },
      });
    next();
  } catch (e) {
    console.log(e);
  }
}

function genToken(req, _res, next) {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const out = [];
  for (let i = 0; i < 8; i += 1) {
    const randomA = Math.ceil(Math.random() * 9);
    const randomB = Math.ceil(Math.random() * 9);
    if (randomA > 5) {
      out.push(Math.ceil(Math.random() * 9));
    } else {
      out.push(letters[randomB]);
    }
  }
  req.loginToken = out.join("");
  next();
}

function loginPost(req, res, next) {
  const { loginToken } = req;
  res.status(200).json({ token: loginToken });
}

module.exports = { isValid, genToken, loginPost };
