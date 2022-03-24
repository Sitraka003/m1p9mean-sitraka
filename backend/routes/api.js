const express = require("express");
const router = express.Router();
const restaurant = require("./restaurant");

router.get("/", function (req, res) {
  res.send("hello hatrany");
});
router.use("/restaurant", restaurant);

module.exports = router;
