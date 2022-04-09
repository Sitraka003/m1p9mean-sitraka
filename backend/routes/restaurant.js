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
router.post("/create", createResto);
router.patch("/update/:_id", updateResto);
module.exports = router;
