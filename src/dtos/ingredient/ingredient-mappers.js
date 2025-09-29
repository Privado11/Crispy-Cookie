const IngredientDto = require("./ingredient-dto");

class IngredientMapper {
  static toDto(ingredientEntity) {
    console.log(ingredientEntity.RecipeIngredient.quantity);
    if (!ingredientEntity) return null;
    return new IngredientDto({
      id: ingredientEntity.id,
      name: ingredientEntity.name,
      RecipeIngredient: ingredientEntity.RecipeIngredient,
    });
  }
}

module.exports = IngredientMapper;
