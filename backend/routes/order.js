const express = require("express");
const {
	createOrder,
	getAllOrders,
	getOrder,
	getBy,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/:_id", getOrder);
router.get("/client/:client_id", getBy);
router.get("/restaurant/:restaurant_id", getBy);
router.get("/deliverer/:deliverer_id", getBy);
module.exports = router;
