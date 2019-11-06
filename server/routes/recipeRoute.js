const router = require("express").Router();
const { celebrate } = require("celebrate");

const { createRecipe, getRecipes } = require("../controller/recipeController");
const { recipe: recipeValidator } = require("../joiSchema");
const jwtMiddleware = require("../middleware/verifyToken");
const paginateMiddleware = require("../middleware/pagination");
const Recipe = require("../model/Recipe");

router.post(
  "/",
  jwtMiddleware,
  celebrate(recipeValidator.create),
  createRecipe
);

router.get(
  "/",
  jwtMiddleware,
  paginateMiddleware(Recipe),
  getRecipes);

  module.exports = router;
