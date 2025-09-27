const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/", UserController.create);     
router.get("/:id", UserController.getById);  
router.put("/:id", UserController.update);   
router.delete("/:id", UserController.delete); 

module.exports = router;
