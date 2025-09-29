const UserMapper = require("../user/user-mappers");

class CommentDto {
  constructor(comment) {
    this.id = comment.id;
    this.comment = comment.comment;
    this.user = comment.User ? UserMapper.toDto(comment.User) : null;
    this.createdAt = comment.createdAt;
  }
}
module.exports = CommentDto;
