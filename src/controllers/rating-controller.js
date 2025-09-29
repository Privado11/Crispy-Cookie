const RatingService = require("../services/rating-service");

class RatingController {
  static async rate(req, res, next) {
    try {
      const rating = await RatingService.rate(
        req.params.id,
        req.userId,
        req.body
      );
      res.json(rating);
    } catch (err) {
      next(err);
    }
  }

  static async getByRecipe(req, res, next) {
    try {
      const ratings = await RatingService.getByRecipe(req.params.id);
      res.json(ratings);
    } catch (err) {
      next(err);
    }
  }

  static async getAverage(req, res, next) {
    try {
      const avg = await RatingService.getAverage(req.params.id);
      res.json(avg);
    } catch (err) {
      next(err);
    }
  }

  static async deleteRating(req, res, next) {
    try {
      await RatingService.delete(req.params.id, req.userId);
      res.json({ message: "Calificación eliminada" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RatingController;
