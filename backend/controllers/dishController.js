const mongoose = require("mongoose");
const restoSchema = require("../models/restaurant");
const RestoModel = mongoose.model("Restaurant", restoSchema);
const dishSchema = require("../models/dish");
const DishModel = mongoose.model("Dish", dishSchema);
const ajvDishService = require("../services/ajv/ajvDish");
const ajvService = require("../services/ajvService");
const only = require("only");
const { sendResponse } = require("../services/utility");
const {
	ERROR_500,
	INCORECT_VALUE,
	RESTO_FIND,
	DISH_CREATE,
	DISH_UPDATE,
	DISH_FIND,
} = require("../services/const");

module.exports = {
	async createDish(req, res) {
		const ajv = ajvDishService.getSchemaDish();
		const body = only(req.body, DISH_CREATE);

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, req.body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		// Check Restaurant
		const resto = await RestoModel.findById(
			body.restaurant,
			RESTO_FIND
		).exec();
		// If Restaurant not found
		if (!resto) {
			return sendResponse(
				res,
				404,
				"NOT_FOUND",
				"The restaurant was not found"
			);
		}
		try {
			const dish = new DishModel(body);
			await dish.save();

			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(dish, DISH_FIND)
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async updateDish(req, res) {
		const _id = req.params._id;
		const ajv = ajvDishService.getSchemaDish(false);
		const body = only(req.body, DISH_UPDATE);

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		try {
			const dish = await DishModel.findOneAndUpdate({ _id: _id }, body, {
				returnDocument: "after",
			}).exec();
			// If user not found
			if (!dish) {
				return sendResponse(
					res,
					404,
					"NOT_FOUND",
					"The dish was not found"
				);
			}
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(dish, DISH_FIND)
			);
		} catch (e) {
			console.log(e);
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findOneDish(req, res) {
		const _id = req.params._id;
		try {
			const dish = await DishModel.findById(_id, DISH_FIND).exec();
			// If user not found
			if (!dish) {
				return sendResponse(
					res,
					404,
					"NOT_FOUND",
					"The dish was not found"
				);
			}
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(dish, DISH_FIND)
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findAllDishes(req, res) {
		try {
			const dishes = await DishModel.find({}, DISH_FIND).exec();
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				dishes.map((dish) => only(dish, DISH_FIND))
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findDishByRestaurant(req, res) {
		const resto_id = req.params._id;

		try {
			const resto = await RestoModel.findById(
				resto_id,
				"_id name"
			).exec();
			// If user not found
			if (!resto) {
				return sendResponse(
					res,
					404,
					"NOT_FOUND",
					"The restaurant was not found"
				);
			}
			console.log(resto);

			const dishes = await DishModel.find(
				{ restaurant: resto_id },
				DISH_FIND
			).exec();
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				dishes.map((dish) => only(dish, DISH_FIND))
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},
};
