const express = require("express");
const ShoppingListController = require("../controllers/shopping-list-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// Generar lista de compras a partir de recetas
router.post("/", authMiddleware, ShoppingListController.generate);

module.exports = router;
