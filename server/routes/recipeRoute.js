const router = require("express").Router();
const { celebrate } = require("celebrate");

const { createRecipe } = require("../controller/recipeController");
const { recipe: recipeValidator } = require("../joiSchema");

router.post("/", celebrate(recipeValidator.create), createRecipe);

module.exports = router;
