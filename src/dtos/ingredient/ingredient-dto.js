class IngredientDto {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.quantity = ingredient.RecipeIngredient
      ? ingredient.RecipeIngredient.quantity
      : null;
  }
}

module.exports = IngredientDto;
