const { RecipeComment, User } = require("../models");
const AppError = require("../utils/app-error");
const CommentSaveDto = require("../dtos/comment/comment-save-dto");
const CommentMapper = require("../dtos/comment/comment-mappers");

class CommentService {
  static async create(recipeId, userId, commentData) {
    if (!recipeId || !userId || !commentData) {
      throw new AppError("Faltan datos", 400);
    }

    const commentSaveDto = new CommentSaveDto({
      recipeId,
      userId,
      ...commentData,
    });

    const commentEntity = CommentMapper.saveDtoToEntity(commentSaveDto);

    const comment = await RecipeComment.create(commentEntity);

    await comment.reload({
      include: [{ model: User }],
    });

    return CommentMapper.toDto(comment);
  }

  static async getByRecipe(recipeId) {
    const comments = await RecipeComment.findAll({
      where: { recipeId },
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });
    return comments.map((c) => CommentMapper.toDto(c));
  }

  static async delete(id, userId) {
    const comment = await RecipeComment.findByPk(id);
    if (!comment) throw new AppError("Comentario no encontrado", 404);
    if (comment.userId !== userId) {
      throw new AppError("No autorizado para eliminar este comentario", 403);
    }
    await comment.destroy();
    return true;
  }
}

module.exports = CommentService;
