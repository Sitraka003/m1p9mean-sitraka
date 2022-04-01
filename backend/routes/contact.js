const express = require("express");
const { sendEmailContact } = require("../controllers/contactController");
const router = express.Router();

router.post("/sendEmail", sendEmailContact);
module.exports = router;
