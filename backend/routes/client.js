const express = require("express");
const { registerClient } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerClient);
module.exports = router;
