const { Recipe, Ingredient } = require("../models");
const AppError = require("../utils/app-error");
const { Op } = require("sequelize");

class ShoppingListService {
  static async getShoppingLists(recipeIds) {
    if (!Array.isArray(recipeIds) || recipeIds.length === 0) {
      throw new AppError("Debes enviar un array de IDs de recetas", 400);
    }

    const recipes = await Recipe.findAll({
      where: { id: { [Op.in]: recipeIds } },
      include: [
        {
          model: Ingredient,
          through: { attributes: ["quantity"] },
        },
      ],
    });

    if (!recipes || recipes.length === 0) {
      throw new AppError("No se encontraron recetas con los IDs proporcionados", 404);
    }

    return recipes.map((recipe) => ({
      recipeId: recipe.id,
      recipeName: recipe.title,
      ingredients: recipe.Ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.RecipeIngredient.quantity,
      })),
    }));
  }
}

module.exports = ShoppingListService;
