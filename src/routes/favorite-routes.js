const express = require("express");
const FavoriteController = require("../controllers/favorite-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/:id", authMiddleware, FavoriteController.addFavorite);
router.get("/", authMiddleware, FavoriteController.getAllByUser);
router.delete("/:id", authMiddleware, FavoriteController.deleteFavorite);


module.exports = router;
