const { RecipeRating, User } = require("../models");
const AppError = require("../utils/app-error");
const RatingMapper = require("../dtos/rating/rating-mappers");
const RatingSaveDto = require("../dtos/rating/rating-save-dto");

class RatingService {
  static async rate(recipeId, userId, ratingData) {
    console.log(ratingData);
    if (ratingData.rating < 1 || ratingData.rating > 5) {
      throw new AppError("La calificación debe estar entre 1 y 5", 400);
    }

    const ratingSaveDto = new RatingSaveDto({
      recipeId,
      userId,
      ...ratingData,
    });

    const ratingEntity = RatingMapper.saveDtoToEntity(ratingSaveDto);

    const [rating] = await RecipeRating.upsert(ratingEntity, {
      returning: true,
    });

    await rating.reload({
      include: [{ model: User }],
    });

    return RatingMapper.toDto(rating);
  }

  static async getByRecipe(recipeId) {
    const ratings = await RecipeRating.findAll({
      where: { recipeId },
      include: [{ model: User }],
    });
    return ratings.map((r) => RatingMapper.toDto(r));
  }

  static async getAverage(recipeId) {
    const ratings = await RecipeRating.findAll({ where: { recipeId } });
    if (ratings.length === 0) return null;

    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    return { recipeId, average: avg.toFixed(2) };
  }

  static async delete(id, userId) {
    const rating = await RecipeRating.findByPk(id);
    if (!rating) throw new AppError("Calificación no encontrada", 404);
    if (rating.userId !== userId) {
      throw new AppError("No autorizado para eliminar esta calificación", 403);
    }
    await rating.destroy();
    return true;
  }
}

module.exports = RatingService;
