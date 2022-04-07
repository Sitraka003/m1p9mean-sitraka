const express = require("express");
const router = express.Router();
const restaurant = require("./restaurant");
const contact = require("./contact");
const client = require("./client");

router.use("/client", client);
router.use("/restaurant", restaurant);
router.use("/contact", contact);

module.exports = router;
