const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: false }, // Unique false because, for one order we create as many rows as the number of different restaurants for this order
  basket: [{
    dish: {
      type: ObjectId, ref: "Dish",
      required: true
    },
    number: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  restaurant: { type: ObjectId, ref: "Restaurant" },

  total: {
    type: Number,
    required: true,
    default: 0
  },
  client: { type: ObjectId, ref: "User", required: true },
  address: { type: String, required: true },

  deliverer: { type: ObjectId, ref: "User" },
  deliveryfee: {
    type: Number, default: 0
  },
  status: {
    type: Number,
    enum: [0 /* Initiated */, 1 /* Validated */, 2 /* Ready for delivery */, 3 /* Delivered */, 9 /* Canceled */],
    default: 0,
    required: true
  }
});

module.exports = orderSchema;
