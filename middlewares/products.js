const Products = require("../model/Products");
const joi = require("joi");

const joiProductSchema = joi.object().keys({
  name: joi.string().min(3).required(),
  price: joi.number().positive().precision(2).required(),
  color: joi.string().min(3).alphanum().required(),
});

function isValid(req, res, next) {
  const { name, price, color } = req.body;
  const valid = joiProductSchema.validate({ name, price, color });
  if (valid.error) {
    return next({
      error: { status: 406, code: "joiErro", message: valid.error.message },
    });
  }
  req.validProduct = valid.value;
  return next();
}

async function getProducts(req, res, next) {
  try {
    const products = await Products.getAll();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
}

async function postProduct(req, res, next) {
  const { validProduct } = req;
  try {
    const inserted = await Products.createProduct(validProduct);
    res.status(200).json(inserted);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getProducts, postProduct, isValid };
