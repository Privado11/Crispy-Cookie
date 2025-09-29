class RatingSaveDto {
  constructor(rating) {
    this.rating = rating.rating;
    this.userId = rating.userId;
    this.recipeId = rating.recipeId;
  }
}

module.exports = RatingSaveDto;
