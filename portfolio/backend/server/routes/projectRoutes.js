const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();

router.post("/", projectController.add);
router.get("/", projectController.getAll);
router.get("/:id", projectController.getByID);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.remove);

module.exports = router;