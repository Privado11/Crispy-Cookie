const express = require("express");
const CommentController = require("../controllers/comment-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/:id/comments", authMiddleware, CommentController.create);
router.get("/:id/comments", authMiddleware, CommentController.getByRecipe);
router.delete("/:id/comments/", authMiddleware, CommentController.delete);

module.exports = router;
