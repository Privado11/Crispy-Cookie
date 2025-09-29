const express = require("express");
const RecipeController = require("../controllers/recipe-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();


router.post("/", authMiddleware, RecipeController.create);
router.put("/:id", authMiddleware, RecipeController.update);
router.delete("/:id", authMiddleware, RecipeController.delete);
router.get("/", authMiddleware, RecipeController.getAll);
router.get("/search", authMiddleware, RecipeController.search);
router.get("/:id", authMiddleware, RecipeController.getById);
router.get("/:id/shopping-list", authMiddleware, RecipeController.getShoppingList);

module.exports = router;
