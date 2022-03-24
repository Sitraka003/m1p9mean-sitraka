var express = require("express");
var router = express.Router();
const api = require("./api");

/* GET home page. */
router.get("/", function (req, res) {
  res.send("hello");
});
router.use("/api", api);

module.exports = router;
