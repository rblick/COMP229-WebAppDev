const express = require("express");
const referenceController = require("../controllers/referenceController");
const router = express.Router();

router.post("/", referenceController.add);
router.get("/", referenceController.getAll);
router.get("/:id", referenceController.getByID);
router.put("/:id", referenceController.update);
router.delete("/:id", referenceController.remove);

module.exports = router;