const RecipeIngredientService = require("../services/recipe-ingredient-service");
const AppError = require("../utils/app-error");

class ShoppingListController {
  /**
   * Generar lista de compras
   * Body esperado: { recipeIds: [1, 2, 3] }
   */
  static async generate(req, res, next) {
    try {
      const { recipeIds } = req.body;

      if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
        throw new AppError("Debe enviar un array de IDs de recetas", 400);
      }

      const shoppingList = await RecipeIngredientService.generateShoppingList(
        recipeIds
      );

      return res.status(200).json({
        success: true,
        data: shoppingList,
      });
    } catch (error) {
      next(error); // lo manda a tu middleware de manejo de errores
    }
  }
}

module.exports = ShoppingListController;
