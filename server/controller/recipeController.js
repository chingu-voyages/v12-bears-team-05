const Recipe = require("../model/Recipe");
const pick = require("lodash").pick;

const createRecipe = async (req, res) => {
  //validating user

  try {
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message
    });
  }
};

module.exports.createRecipe = createRecipe;
