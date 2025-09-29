const FavoriteDto = require("./favorite-dto");

class FavoriteMapper {
  static toDto(favoriteEntity) {
    if (!favoriteEntity) return null;
    return new FavoriteDto({
      id: favoriteEntity.id,
      Recipe: favoriteEntity.Recipe ? favoriteEntity.Recipe : null,
    });
  }

  static saveDtoToEntity(favoriteSaveDto) {
    if (!favoriteSaveDto) return null;
    return {
      userId: favoriteSaveDto.userId,
      recipeId: favoriteSaveDto.recipeId,
    };
  }

  static toEntity(favoriteDto) {
    if (!favoriteDto) return null;
    return {
      id: favoriteDto.id,
      userId: favoriteDto.userId,
      recipeId: favoriteDto.recipeId,
    };
  }
}

module.exports = FavoriteMapper;
