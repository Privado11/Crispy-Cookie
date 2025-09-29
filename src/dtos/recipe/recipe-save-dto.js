class RecipeSaveDto {
    constructor(recipe) {
      this.title = recipe.title;
      this.description = recipe.description;
      this.preparation = recipe.preparation;
      this.userId = recipe.userId;
      this.image = recipe.image;
      this.ingredients = recipe.ingredients || []; 
    }
  }
  
  module.exports = RecipeSaveDto;
  