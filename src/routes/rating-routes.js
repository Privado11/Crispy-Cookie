const express = require("express");
const RatingController = require("../controllers/rating-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/:id/rating", authMiddleware, RatingController.rate);
router.get("/:id/ratings", authMiddleware, RatingController.getByRecipe);
router.get("/:id/ratings/average", authMiddleware, RatingController.getAverage);
router.delete("/:id/rating", authMiddleware, RatingController.deleteRating);

module.exports = router;
