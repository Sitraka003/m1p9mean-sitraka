const express = require("express");
const {
	createUser,
	updateUser,
	findOneUser,
	findAllUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", findAllUser);
router.get("/:_id", findOneUser);
router.post("/create", createUser);
router.patch("/update/:_id", updateUser);
module.exports = router;
