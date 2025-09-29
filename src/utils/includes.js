const {
  User,
  Ingredient,
  RecipeRating,
  RecipeComment,
} = require("../models");

const recipeIncludes = [
  { model: User },
  { model: Ingredient },
  { model: RecipeRating, include: [{ model: User }] },
  { model: RecipeComment, include: [{ model: User }] },
];

module.exports = recipeIncludes;
