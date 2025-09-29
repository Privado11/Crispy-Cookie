const RatingDto = require("./rating-dto");

class RatingMapper {
  static toDto(ratingEntity) {
    if (!ratingEntity) return null;
    return new RatingDto({
      id: ratingEntity.id,
      rating: ratingEntity.rating,
      User: ratingEntity.User ? ratingEntity.User : null,
      recipeId: ratingEntity.recipeId,
    });
  }

  static saveDtoToEntity(ratingSaveDto) {
    if (!ratingSaveDto) return null;
    return {
      rating: ratingSaveDto.rating,
      userId: ratingSaveDto.userId,
      recipeId: ratingSaveDto.recipeId,
    };
  }

  static toEntity(ratingDto) {
    if (!ratingDto) return null;
    return {
      id: ratingDto.id,
      rating: ratingDto.rating,
      userId: ratingDto.userId,
      recipeId: ratingDto.recipeId,
    };
  }
}

module.exports = RatingMapper;
