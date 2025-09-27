const RecipeDto = require("./recipe-dto");
const RecipeSaveDto = require("./recipe-save-dto");
const UserDto = require("../user/user-dto");

class RecipeMapper {
  static toDto(recipeEntity) {
    if (!recipeEntity) return null;

    return new RecipeDto({
      id: recipeEntity.id,
      title: recipeEntity.title,
      description: recipeEntity.description,
      image: recipeEntity.image,
      user: recipeEntity.User ? recipeEntity.User : null,
      ingredients: recipeEntity.Ingredients || []
    });
  }

  static saveDtoToEntity(recipeSaveDto) {
    if (!recipeSaveDto) return null;

    return {
      title: recipeSaveDto.title,
      description: recipeSaveDto.description,
      image: recipeSaveDto.image,
      userId: recipeSaveDto.userId,
      ingredients: recipeSaveDto.ingredients || []
    };
  }

  static toEntity(recipeDto) {
    if (!recipeDto) return null;

    return {
      id: recipeDto.id,
      title: recipeDto.title,
      description: recipeDto.description,
      image: recipeDto.image,
      userId: recipeDto.user ? recipeDto.user.id : recipeDto.userId,
      ingredients: recipeDto.ingredients || []
    };
  }
}

module.exports = RecipeMapper;
