const joi = require("joi");
const Order = require("../model/Order");
const User = require("../model/User");
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");

const joiSellSchema = joi.object().keys({
  user: joi.string().alphanum().required(),
  products: joi
    .array()
    .items(
      joi.custom((v, h) => {
        if (ObjectId.isValid(v)) return true;
        return h.message("invalid product id");
      })
    )
    .required(),
});

function isValid(req, res, next) {
  const { user, products } = req.body;
  const valid = joiSellSchema.validate({ user, products });
  if (valid.error) {
    return next({
      error: {
        status: 406,
        code: "invalidSellObject",
        message: valid.error.message,
      },
    });
  }
  next();
}

async function checkout(req, res, next) {
  const { user, products } = req.body;
  try {
    const insertOrder = await Order.insert({ user, products });
    res.status(201).json(insertOrder);
    next();
  } catch (e) {
    console.log(e);
  }
}

async function sendEmail(req, res, next) {
  const { user, products } = req.body;

  try {
    const { email, firstName, lastName } = await User.getUserByUsername(user);

    const output = `
    <h1>Hello ${firstName} ${lastName} You have done a order</h1>
    <h2>details:</h2>
    <p>${products}</p>
  `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "leofml665@gmail.com",
        pass: '',
      },
    });

    const emailSend = await transporter.sendMail({
      from: "leofml665@gmail.com",
      to: email,
      subject: "Order Details",
      text: "order details",
      html: output,
    });
    console.log(emailSend);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { isValid, checkout, sendEmail };
