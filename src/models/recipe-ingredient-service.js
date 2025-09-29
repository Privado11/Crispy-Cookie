const { RecipeIngredient, Ingredient } = require("../models");
const AppError = require("../utils/app-error");
const { Op } = require("sequelize");

class RecipeIngredientService {
  /**
   * Genera una lista de compras en base a un array de IDs de recetas
   * @param {number[]} recipeIds
   */
  static async generateShoppingList(recipeIds) {
    if (!recipeIds || recipeIds.length === 0) {
      throw new AppError("Debe proporcionar al menos un ID de receta", 400);
    }

    // Traer todos los ingredientes de esas recetas
    const recipeIngredients = await RecipeIngredient.findAll({
      where: {
        recipeId: { [Op.in]: recipeIds },
      },
      include: [
        {
          model: Ingredient,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!recipeIngredients || recipeIngredients.length === 0) {
      return [];
    }

    // Agrupar por ingrediente
    const shoppingList = {};
    for (const ri of recipeIngredients) {
      const ingId = ri.ingredientId;
      if (!shoppingList[ingId]) {
        shoppingList[ingId] = {
          ingredientId: ingId,
          name: ri.Ingredient.name,
          quantities: [],
        };
      }
      shoppingList[ingId].quantities.push(ri.quantity);
    }

    return Object.values(shoppingList);
  }
}

module.exports = RecipeIngredientService;
