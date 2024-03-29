const express = require("express");
const router = express.Router();
const restaurant = require("./restaurant");
const dish = require("./dish");
const order = require("./order");
const contact = require("./contact");
const client = require("./client");
const user = require("./user");

router.use("/client", client);
router.use("/restaurant", restaurant);
router.use("/dish", dish);
router.use("/order", order);
router.use("/contact", contact);
router.use("/user", user);

module.exports = router;
