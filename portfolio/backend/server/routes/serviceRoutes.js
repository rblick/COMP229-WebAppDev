const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();

router.post("/", serviceController.add);
router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getByID);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.remove);

module.exports = router;