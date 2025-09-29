const UserMapper = require("../user/user-mappers");

class RatingDto {
  constructor(rating) {
    this.id = rating.id;
    this.rating = rating.rating;
    this.user = rating.User ? UserMapper.toDto(rating.User) : null;
    this.createdAt = rating.createdAt;
  }
}
module.exports = RatingDto;
