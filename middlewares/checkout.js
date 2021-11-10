const joi = require("joi");
const Order = require("../model/Order");
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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: '',
        pass: "",
      },
    });

    const emailSent = await transporter.sendMail({
      from: '"Fred Foo" <foo@example.com>',
      to: "leonardoferreira@pm.me",
      subject: "subject",
      text: "text body 2222222",
    });

    console.log('emailSent ============');
    console.log(emailSent);
    res.status(201).json(insertOrder);

  } catch (e) {
    console.log(e);
  }
}

module.exports = { isValid, checkout };
