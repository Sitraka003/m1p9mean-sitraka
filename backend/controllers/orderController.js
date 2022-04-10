const mongoose = require("mongoose");
const orderSchema = require("../models/order");

const userSchema = require("../models/user");
const UserModel = mongoose.model("User", userSchema);

const dishSchema = require("../models/dish");
const DishModel = mongoose.model("Dish", dishSchema);


const OrderModel = mongoose.model("Order", orderSchema);
const ajvOrderService = require("../services/ajv/ajvOrder");
const ajvService = require("../services/ajvService");
const only = require("only");
const { sendResponse } = require("../services/utility");
const {
  ERROR_500,
  INCORECT_VALUE,
  ORDER_CREATE,
  ORDER_CREATE_RETURNED,
  ORDER_UPDATE,
  ORDER_FIND,
  DISH_FIND

} = require("../services/const");

module.exports = {
  async createOrder(req, res) {
    const ajv = ajvOrderService.getSchemaOrder();
    const body = only(req.body, ORDER_CREATE);

    // Validate the input from user
    try {
      ajvService.checkWithAjv(ajv, req.body);
    } catch (e) {
      console.log(e);
      return sendResponse(res, 400, "INVALID_VALUE", "Input is not correct");
    }

    try {
      // Check client exist
      const user = await UserModel.findById(body.client, "_id name firstname email").exec();
      // If user not found
      if (!user) {
        return sendResponse(
          res,
          404,
          "NOT_FOUND",
          "The user was not found"
        );
      }


      // Create Basket
      if (!body.basket) return sendResponse(
        res,
        400,
        "INVALID_VALUE",
        "Order list is not incorrect"
      );
      const orders = [];
      const restaurants = [];


      for (const order of body.basket) {
        let total = 0;
        const dish = await DishModel.findOne({ _id: order.dish, status: 1 }, DISH_FIND).exec();
        // If user not found
        if (!dish) {
          return sendResponse(
            res,
            404,
            "NOT_FOUND",
            "One of the dishes was not found"
          );
        }
        total += dish.price * order.number;
        const dishRestaurantId = dish.restaurant._id.toString();
        if (restaurants.includes(dishRestaurantId)) {
          const currentOrderObject = orders[restaurants.indexOf(dishRestaurantId)];
          console.log(currentOrderObject)
          if (!currentOrderObject || !currentOrderObject.restaurant.equals(dish.restaurant)) return sendResponse(res, 500, ERROR_500);
          if (!currentOrderObject.basket.map(obj => obj.dish).includes(dish._id)) {
            currentOrderObject.basket.push({
              dish: dish._id,
              number: order.number,
              total: total
            });
          }
        } else {
          orders.push({
            basket: [{
              dish: dish._id,
              number: order.number
            }],
            restaurant: dish.restaurant,
            total: total
          });
          restaurants.push(dishRestaurantId);
        }
      }
      // Generate order id
      const orderId = (Math.random() + 1).toString(36).substring(7) + Date.now();

      const finalOrders = [];
      for (const order of orders) {
        const newOrder = await OrderModel.create({
          orderId: orderId,
          client: user._id,
          address: body.address,
          ...order
        });
        finalOrders.push(newOrder);
      }


      return sendResponse(
        res,
        200,
        "OK",
        "Success",
        finalOrders.map(obj => only(obj, ORDER_CREATE_RETURNED))
      );

    } catch (e) {
      console.log(e);
      return sendResponse(res, 500, ERROR_500);
    }
  }
};
