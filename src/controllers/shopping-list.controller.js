const ShoppingListService = require("../services/shopping-list-service");

class ShoppingListController {

  static async getShoppingLists(req, res, next) {
    try {
      const { recipeIds } = req.body; 
      const shoppingLists = await ShoppingListService.getShoppingLists(recipeIds);
      res.json(shoppingLists);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ShoppingListController;
