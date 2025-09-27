class RecipeSaveDto {
    constructor(recipe) {
      this.title = recipe.title;
      this.description = recipe.description;
      this.image = recipe.image;
      this.userId = recipe.userId;
      this.ingredients = recipe.ingredients || []; 
    }
  }
  
  module.exports = RecipeSaveDto;
  