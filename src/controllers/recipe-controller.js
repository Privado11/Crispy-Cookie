const RecipeService = require("../services/recipe-service");
const RecipeSaveDto = require("../dtos/recipe/recipe-save-dto");

class RecipeController {
  static async create(req, res) {
    try {
      const dto = new RecipeSaveDto(req.body);
      const recipe = await RecipeService.create(dto);
      res.status(201).json(recipe);
    } catch (error) {
      console.error("Error al crear receta:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const recipes = await RecipeService.getAll();
      res.json(recipes);
    } catch (error) {
      console.error("Error al listar recetas:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const recipe = await RecipeService.getById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: "Receta no encontrada" });
      }
      res.json(recipe);
    } catch (error) {
      console.error("Error al obtener receta:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const dto = new RecipeSaveDto(req.body);
      const recipe = await RecipeService.update(req.params.id, dto);
      res.json(recipe);
    } catch (error) {
      console.error("Error al actualizar receta:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await RecipeService.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Receta no encontrada" });
      }
      res.json({ message: "Receta eliminada" });
    } catch (error) {
      console.error("Error al eliminar receta:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async search(req, res) {
    try {
      const query = req.query.q;
      if (!query) {
        return res
          .status(400)
          .json({ message: "Debe proporcionar un término de búsqueda" });
      }

      const recipes = await RecipeService.search(query);
      res.json(recipes);
    } catch (error) {
      console.error("Error al buscar recetas:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RecipeController;
