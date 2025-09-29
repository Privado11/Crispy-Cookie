const express = require("express");
const UserController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getById);
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.delete);

module.exports = router;
