const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const dishSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	tags: [String],
	etat: {
		type: Number,
		enum: [0 /* Created */, 1 /* Available */, 2 /* Deleted */],
		required: true,
	},
	restaurant: { type: ObjectId, ref: "Restaurant" },
});

module.exports = dishSchema;
