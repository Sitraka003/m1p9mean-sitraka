const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  dish: { type: ObjectId, ref: "Dish" },
  number: { type: Number, required: true },
  basket: { type: ObjectId, ref: "Basket" },
  status: {
    type: Number,
    enum: [0 /* Initiated */, 1 /* Validated */, 2 /* Ready for delivery */, 3 /* Delivered */],
    default: 0
  }
});

module.exports = orderSchema;
