const RecipeService = require("../services/recipe-service");
const AppError = require("../utils/app-error");

class RecipeController {
  static async create(req, res, next) {
    try {
      const recipe = await RecipeService.create(req.body, req.userId);
      res.status(201).json(recipe);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const recipes = await RecipeService.getAll();
      res.json(recipes);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const recipe = await RecipeService.getById(req.params.id);
      res.json(recipe);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const recipe = await RecipeService.update(
        req.params.id,
        req.body,
        req.userId
      );
      res.json(recipe);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await RecipeService.delete(req.params.id, req.userId);
      res.json({ message: "Receta eliminada" });
    } catch (err) {
      next(err);
    }
  }

  static async search(req, res, next) {
    try {
      const query = req.query.q;
      if (!query) {
        throw new AppError("Debe proporcionar un término de búsqueda", 400);
      }
      const recipes = await RecipeService.search(query);
      res.json(recipes);
    } catch (err) {
      next(err);
    }
  }

  static async getShoppingList(req, res, next) {
    try {
      const shoppingList = await RecipeService.getShoppingList(req.params.id);
      res.json(shoppingList);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RecipeController;