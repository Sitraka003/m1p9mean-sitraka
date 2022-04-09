const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
	dish: { type: Schema.ObjectId, ref: "Dish" },
	user: { type: Schema.ObjectId, ref: "User" },
	price: { type: Number, required: true },
	tags: [String],
	etat: {
		type: Number,
		enum: [0 /* Created */, 1 /* Available */, 2 /* Deleted */],
	},
	restaurant: { type: ObjectId, ref: "Restaurant" },
});

module.exports = orderSchema;
