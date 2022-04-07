const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
const { ROLES } = require("../services/const");

const userSchema = new Schema({
	name: { type: String, required: true },
	firstname: { type: String, required: false },
	address: { type: String, required: false },
	email: { type: String, required: true, unique: true },
	hashed_password: { type: String, required: true },
	authToken: { type: String, required: false },
	contacts: { type: Array, required: false },
	role: [
		{
			type: String,
			enum: ROLES,
		},
	],
	restaurant: { type: ObjectId, ref: "Restaurant" },
});

module.exports = userSchema;
