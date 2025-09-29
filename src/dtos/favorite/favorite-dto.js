const RecipeMapper = require("../recipe/recipe-mappers");

class FavoriteDto {
  constructor(favorite) {
    this.id = favorite.id;
    this.recipe = favorite.Recipe ? RecipeMapper.toDto(favorite.Recipe) : null;
  }
}

module.exports = FavoriteDto;
