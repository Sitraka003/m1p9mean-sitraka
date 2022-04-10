const express = require("express");
const {
	findAllDishes,
	findOneDish,
	createDish,
	updateDish,
	findDishByRestaurant,
} = require("../controllers/dishController");
const router = express.Router();

router.get("/", findAllDishes);
router.get("/:_id", findOneDish);
router.post("/", createDish);
router.put("/:_id", updateDish);

router.get("/resto/:_id", findDishByRestaurant);
module.exports = router;
