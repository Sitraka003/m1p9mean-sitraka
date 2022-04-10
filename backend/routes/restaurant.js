const express = require("express");
const {
	updateResto,
	createResto,
	findOneResto,
	findAllResto,
} = require("../controllers/restaurantController");
const router = express.Router();

router.get("/", findAllResto);
router.get("/:_id", findOneResto);
router.post("/", createResto);
router.put("/:_id", updateResto);
module.exports = router;
