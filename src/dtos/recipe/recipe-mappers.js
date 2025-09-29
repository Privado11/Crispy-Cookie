const RecipeDto = require("./recipe-dto");

class RecipeMapper {
  static toDto(recipeEntity) {
    if (!recipeEntity) return null;

    return new RecipeDto({
      id: recipeEntity.id,
      title: recipeEntity.title,
      description: recipeEntity.description,
      preparation: recipeEntity.preparation,
      image: recipeEntity.image,
      User: recipeEntity.User ? recipeEntity.User : null,
      Ingredients: recipeEntity.Ingredients || [],
      RecipeComments: recipeEntity.RecipeComments || [],
      RecipeRatings: recipeEntity.RecipeRatings || null,
    });
  }

  static saveDtoToEntity(recipeSaveDto) {
    if (!recipeSaveDto) return null;

    return {
      title: recipeSaveDto.title,
      description: recipeSaveDto.description,
      preparation: recipeSaveDto.preparation,
      image: recipeSaveDto.image,
      userId: recipeSaveDto.userId,
      ingredients: recipeSaveDto.ingredients || [],
    };
  }

  static toEntity(recipeDto) {
    if (!recipeDto) return null;

    return {
      id: recipeDto.id,
      title: recipeDto.title,
      description: recipeDto.description,
      preparation: recipeDto.preparation,
      image: recipeDto.image,
      userId: recipeDto.user ? recipeDto.user.id : recipeDto.userId,
      ingredients: recipeDto.ingredients || [],
    };
  }
}

module.exports = RecipeMapper;
