const joi = require('joi');

const joiUserSchema = joi.object().keys({
  user: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required()
});

function checkUser(req, res, next) {
  const { user, email, password } = req.body;
  const valid = joiUserSchema.validate({ user, email, password });

  if (valid.error) {
    return next({ error: { code: 'userNotValid', message: valid.error.message } });
  }

  next();
}

function addUser(req, res, next) {
  const user = req.userValid
  try {
    const inserted = await User.create(user)
    return res.status(201).json(inserted)
  } catch (e) {
    console.log(e)
  }
}

module.exports = { checkUser, addUser };