const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/", userController.add);
router.get("/", userController.getAll);
router.get("/:id", userController.getByID);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;