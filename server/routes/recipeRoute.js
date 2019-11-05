const router = require("express").Router();
const { celebrate } = require("celebrate");

const { createRecipe } = require("../controller/recipeController");
const { recipe: recipeValidator } = require("../joiSchema");
const jwtMiddleware = require("../middleware/verifyToken");
router.post(
  "/",
  jwtMiddleware,
  celebrate(recipeValidator.create),
  createRecipe
);

module.exports = router;
