const Categories = require("../model/Categories");

async function getCategories(req, res, next) {
  try {
    const categories = await Categories.getAll();
    res.status(200).json(categories);
  } catch (e) {
    console.log(e);
  }
}

function isCategoryValid(req, res, next) {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name === " " || name.length < 3) {
    return next({
      error: {
        code: "invalidCategory",
        message: "category name must be a a string with 3 more characters",
      },
    });
  }
  return next();
}

async function postCategory(req, res, next) {
  const { name } = req.body;
  try {
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getCategories, isCategoryValid, postCategory };
