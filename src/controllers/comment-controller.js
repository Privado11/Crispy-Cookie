const CommentService = require("../services/comment-service");

class CommentController {
  static async create(req, res, next) {
    try {
      const newComment = await CommentService.create(
        req.params.id,
        req.userId,
        req.body
      );
      res.status(201).json(newComment);
    } catch (err) {
      next(err);
    }
  }

  static async getByRecipe(req, res, next) {
    try {
      const comments = await CommentService.getByRecipe(req.params.id);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await CommentService.delete(req.params.id, req.userId);
      res.json({ message: "Comentario eliminado" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CommentController;
