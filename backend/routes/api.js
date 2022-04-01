const express = require("express");
const router = express.Router();
const restaurant = require("./restaurant");
const contact = require("./contact");

router.get("/", function (req, res) {
	res.send("hello hatrany");
});
router.use("/restaurant", restaurant);
router.use("/contact", contact);

module.exports = router;
