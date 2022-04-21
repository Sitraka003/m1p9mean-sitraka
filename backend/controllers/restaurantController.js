const mongoose = require("mongoose");
const restoSchema = require("../models/restaurant");
const RestoModel = mongoose.model("Restaurant", restoSchema);
const ajvRestoService = require("../services/ajv/ajvRestaurant");
const ajvService = require("../services/ajvService");
const only = require("only");
const { sendResponse } = require("../services/utility");
const {
	ERROR_500,
	INCORRECT_VALUE,
	RESTO_CREATE,
	RESTO_UPDATE,
	RESTO_FIND,
} = require("../services/const");

module.exports = {
	async createResto(req, res) {
		const ajv = ajvRestoService.getSchemaResto();
		const body = only(req.body, RESTO_CREATE);

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, req.body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		await RestoModel.init();
		try {
			const resto = new RestoModel(body);
			await resto.save();

			return sendResponse(res, 200, "OK", "Success", resto);
		} catch (e) {
			console.log(e);
			// Verifiy if name unique
			if (e.code === 11000) {
				return sendResponse(
					res,
					400,
					"DUPLICATE_KEY",
					`Name ${e.keyValue.name} already exist`,
					{ name: e.keyValue.name }
				);
			}
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async updateResto(req, res) {
		const _id = req.params._id;
		const ajv = ajvRestoService.getSchemaResto(false);
		const body = only(req.body, RESTO_UPDATE);

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		try {
			const resto = await RestoModel.findOneAndUpdate(
				{ _id: _id },
				body,
				{
					returnDocument: "after",
				}
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
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(resto, RESTO_CREATE)
			);
		} catch (e) {
			console.log(e);
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findOneResto(req, res) {
		const _id = req.params._id;
		try {
			const resto = await RestoModel.findById(_id, RESTO_FIND).exec();
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
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(resto, RESTO_FIND)
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findAllResto(req, res) {
		try {
			const restos = await RestoModel.find({}, RESTO_FIND).exec();
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				restos.map((resto) => only(resto, RESTO_FIND))
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},
};
