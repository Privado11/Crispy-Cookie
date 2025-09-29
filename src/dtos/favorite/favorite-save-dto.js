class FavoriteSaveDto {
  constructor(favorite) {
    this.userId = favorite.userId;
    this.recipeId = favorite.recipeId;
  }
}

module.exports = FavoriteSaveDto;
