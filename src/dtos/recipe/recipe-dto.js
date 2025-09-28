const UserDto = require("../user/user-dto");

class RecipeDto {
  constructor({ id, title, description, image, user, ingredients }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.user = user ? new UserDto(user) : null;

    this.ingredients = (ingredients || []).map(ing => ({
      id: ing.id,
      name: ing.name,
      quantity: ing.RecipeIngredient ? ing.RecipeIngredient.quantity : null,
    }));
  }
}

module.exports = RecipeDto;
