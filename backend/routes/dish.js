const express = require("express");
const { findAllDishes, findOneDish, createDish, updateDish } = require("../controllers/dishController");
const router = express.Router();

router.get("/", findAllDishes);
router.get("/:_id", findOneDish);
router.post("/create", createDish);
router.patch("/update/:_id", updateDish);
module.exports = router;
