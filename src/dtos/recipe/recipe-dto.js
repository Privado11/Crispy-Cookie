const UserMapper = require("../user/user-mappers");
const IngredientMapper = require("../ingredient/ingredient-mappers");
const CommentMapper = require("../comment/comment-mappers");
const RatingMapper = require("../rating/rating-mappers");

class RecipeDto {
  constructor(recipe) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.preparation = recipe.preparation;
    this.image = recipe.image;
    this.createdAt = recipe.createdAt;

    this.user = recipe.User ? UserMapper.toDto(recipe.User) : null;

    this.ingredients = recipe.Ingredients
      ? recipe.Ingredients.map((i) => IngredientMapper.toDto(i))
      : [];

    this.comments = recipe.RecipeComments
      ? recipe.RecipeComments.map((c) => CommentMapper.toDto(c))
      : [];

    this.ratings = recipe.RecipeRatings
      ? recipe.RecipeRatings.map((r) => RatingMapper.toDto(r))
      : [];

    this.totalComments = this.comments.length;

    this.totalRatings = this.ratings.length;
    this.averageRating =
      this.totalRatings > 0
        ? (
            this.ratings.reduce((sum, r) => sum + r.rating, 0) /
            this.totalRatings
          ).toFixed(2)
        : null;
  }
}

module.exports = RecipeDto;
