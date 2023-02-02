const { model, Schema } = require("mongoose");

// Shape of a recipe
const recipeSchema = new Schema({
  name: String,
  description: String,
  createdAt: String,
  thumbsUp: Number,
  thumbsDown: Number,
});

module.exports = model("Recipe", recipeSchema);
