const express = require("express");
const ShoppingListController = require("../controllers/shopping-list.controller");

const router = express.Router();

router.post("/", ShoppingListController.getShoppingLists);

module.exports = router;
