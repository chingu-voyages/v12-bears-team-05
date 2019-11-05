const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  servings: Number,
  serving_amount: Number,
  prep_time: {
    hours: { type: Number, min: 0, max: 24 },
    minutes: { type: Number, min: 0, max: 60 }
  },
  cook_time: {
    hours: { type: Number, min: 0, max: 24 },
    minutes: { type: Number, min: 0, max: 60 }
  },
  instructions: Array,
  notes: String,
  tags: Array,
  images: Array,
  privacy: {
    type: String,
    enum: ["public", "private", "friends"]
  },
  ingredients: Array,
  createdDate: {
    type: Date,
    default: Date.now
  },
  user_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Recipe", recipeSchema);
