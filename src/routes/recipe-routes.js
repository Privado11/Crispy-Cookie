const express = require("express");
const RecipeController = require("../controllers/recipe-controller");

const router = express.Router();

router.post("/", RecipeController.create);
router.get("/", RecipeController.getAll);
router.get("/search", RecipeController.search); 
router.get("/:id", RecipeController.getById);
router.put("/:id", RecipeController.update);
router.delete("/:id", RecipeController.delete);

module.exports = router;
