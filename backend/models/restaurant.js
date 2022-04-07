const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const restaurantSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	address: { type: String, required: false },
	contacts: { type: Array, required: false },
});

module.exports = restaurantSchema;
