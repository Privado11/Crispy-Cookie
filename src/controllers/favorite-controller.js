const FavoriteService = require("../services/favorites-service");

class FavoriteController {
  static async addFavorite(req, res, next) {
    try {
      const favorite = await FavoriteService.add(req.params.id, req.userId);
      res.json(favorite);
    } catch (err) {
      next(err);
    }
  }

  static async getAllByUser(req, res, next) {
    try {
      const favorites = await FavoriteService.getAllByUser(req.userId);
      res.json(favorites);
    } catch (err) {
      next(err);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      await FavoriteService.delete(req.params.id, req.userId);
      res.json({ message: "Favorito eliminado" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FavoriteController;
