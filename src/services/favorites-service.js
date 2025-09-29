const { Favorite, Recipe } = require("../models");
const AppError = require("../utils/app-error");
const FavoriteMapper = require("../dtos/favorite/favorite-mappers");
const FavoriteSaveDto = require("../dtos/favorite/favorite-save-dto");
const recipeIncludes = require("../utils/includes");

class FavoriteService {
  static async add(recipeId, userId) {
    const favoriteSaveDto = new FavoriteSaveDto({
      recipeId,
      userId,
    });

    const favoriteEntity = FavoriteMapper.saveDtoToEntity(favoriteSaveDto);

    const [favorite] = await Favorite.upsert(favoriteEntity, {
      returning: true,
    });

    await favorite.reload({
      include: [{ model: Recipe, include: recipeIncludes }],
    });

    return FavoriteMapper.toDto(favorite);
  }

  static async getAllByUser(userId) {
    console.log(userId);
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [{ model: Recipe, include: recipeIncludes }],
    });
    return favorites.map((fav) => FavoriteMapper.toDto(fav));
  }

  static async delete(id, userId) {
    const favorite = await Favorite.findByPk(id);
    if (!favorite) throw new AppError("Favorito no encontrado", 404);
    if (favorite.userId !== userId) {
      throw new AppError("No autorizado para eliminar este favorito", 403);
    }
    await favorite.destroy();
    return true;
  }
}

module.exports = FavoriteService;
