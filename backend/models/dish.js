const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const dishSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	tags: [String],
	status: {
		type: Number,
		enum: [0 /* Created */, 1 /* Available */, 9 /* Deleted */],
		required: true,
		default: 0,
	},
	restaurant: { type: ObjectId, ref: "Dish", required: true },
	images: [String]
});

module.exports = dishSchema;
