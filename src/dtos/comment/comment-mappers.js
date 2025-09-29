const CommentDto = require("./comment-dto");

class CommentMapper {
  static toDto(commentEntity) {
    if (!commentEntity) return null;

    return new CommentDto({
      id: commentEntity.id,
      comment: commentEntity.comment, 
      User: commentEntity.User ? commentEntity.User : null,
      recipeId: commentEntity.recipeId,
      createdAt: commentEntity.createdAt,
    });
  }

  static saveDtoToEntity(commentSaveDto) {
    if (!commentSaveDto) return null;
    return {
      comment: commentSaveDto.comment,
      userId: commentSaveDto.userId,
      recipeId: commentSaveDto.recipeId,
    };
  }

  static toEntity(commentDto) {
    if (!commentDto) return null;
    return {
      id: commentDto.id,
      comment: commentDto.comment,
      userId: commentDto.userId,
      recipeId: commentDto.recipeId,
    };
  }
}

module.exports = CommentMapper;
