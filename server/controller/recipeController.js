const Recipe = require("../model/Recipe");
const pick = require("lodash").pick;

const createRecipe = async (req, res, next) => {
  try {
    // const toSave = pick(req.body, ["name", "description", "servings",]);
    console.log("req.user", req.user);
    const recipe = new Recipe({
      ...req.body,
      user_id: req.user._id
    });
    const savedRecipe = await recipe.save();
    if (!savedRecipe)
      return next(new Error("Failed to save recipe, please try again later"));
    return res.json({
      success: true,
      message: "Recipe added successfully"
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message
    });
  }
};

const getRecipes = async (req, res) => {
  res.json(res.paginatedResults);
};

module.exports.createRecipe = createRecipe;
module.exports.getRecipes = getRecipes;
