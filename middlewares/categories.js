const Categories = require("../model/Categories");

function erroRes(err, req, res, next) {
  res.status(err.error.status).json({ message: err.error.message });
}

async function getCategories(req, res, next) {
  try {
    const categories = await Categories.getAll();
    res.status(200).json(categories);
  } catch (e) {
    console.log(e);
  }
}

async function isCategoryValid(req, res, next) {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name === " " || name.length < 3) {
    return next({
      error: {
        status: 406,
        code: "invalidCategory",
        message: "category name must be a a string with 3 more characters",
      },
    });
  }
  try {
    const category = await Categories.getCategoryByName(name);
    if (category) {
      return next({
        error: {
          status: 409,
          code: "categoryAlreadyExists",
          message: "category alredy exists in the DB",
        },
      });
    }
    return next();
  } catch (e) {
    console.log(e);
  }
}

async function postCategory(req, res, next) {
  const { name } = req.body;
  try {
    const insert = await Categories.createCategorie(name);
    return res.status(201).json(insert);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { erroRes, getCategories, isCategoryValid, postCategory };
