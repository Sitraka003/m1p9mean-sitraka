const mongoose = require("mongoose");
const userSchema = require("../models/user");
const UserModel = mongoose.model("User", userSchema);
const ajvUserService = require("../services/ajv/ajvUser");
const ajvService = require("../services/ajvService");
const only = require("only");
const { sendResponse } = require("../services/utility");
const {
	CLIENT_REGISTER,
	ERROR_500,
	INCORECT_VALUE,
	USER_CREATE,
	USER_UPDATE,
	USER_FIND,
} = require("../services/const");
const md5 = require("md5");

module.exports = {
	async createUser(req, res) {
		const baseUrlPath = req.baseUrl + req.path;
		let _ajv, _body;
		if (baseUrlPath.includes("api/client/register")) {
			_ajv = ajvUserService.getSchemaRegister();
			_body = only(req.body, CLIENT_REGISTER);
		} else {
			_ajv = ajvUserService.getSchemaCreateUser();
			_body = only(req.body, USER_CREATE);
		}
		const ajv = _ajv;
		const body = _body;

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, req.body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		// Verify password if match
		if (req.body.password !== req.body.confirmPassword)
			return sendResponse(
				res,
				400,
				INCORECT_VALUE,
				"Password and confirmPassword didn't maatch"
			);
		// Hash password
		body.hashed_password = md5(req.body.password);

		await UserModel.init();
		try {
			const user = new UserModel(body);
			await user.save();

			return sendResponse(res, 200, "OK", "Success");
		} catch (e) {
			console.log(e);
			// Verifiy if email unique
			if (e.code === 11000) {
				return sendResponse(
					res,
					400,
					"DUPLICATE_KEY",
					`Email ${e.keyValue.email} already exist`,
					{ email: e.keyValue.email }
				);
			}
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async updateUser(req, res) {
		const _id = req.params._id;
		const ajv = ajvUserService.getSchemaUpdateUser();
		const body = only(req.body, USER_UPDATE);

		// Validate the input from user
		try {
			ajvService.checkWithAjv(ajv, body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		try {
			const user = await UserModel.findOneAndUpdate({ _id: _id }, body, {
				returnDocument: "after",
			}).exec();
			console.log(user);
			// If user not found
			if (!user) {
				return sendResponse(
					res,
					404,
					"NOT_FOUND",
					"The user was not found"
				);
			}
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(user, USER_FIND)
			);
		} catch (e) {
			console.log(e);
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findOneUser(req, res) {
		const _id = req.params._id;
		try {
			const user = await UserModel.findById(_id, USER_FIND).exec();
			// If user not found
			if (!user) {
				return sendResponse(
					res,
					404,
					"NOT_FOUND",
					"The user was not found"
				);
			}
			console.log(user);
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				only(user, USER_FIND)
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},

	async findAllUser(req, res) {
		try {
			const users = await UserModel.find({}, USER_FIND).exec();
			return sendResponse(
				res,
				200,
				"OK",
				"Success",
				users.map((user) => only(user, USER_FIND))
			);
		} catch (e) {
			return sendResponse(res, 500, ERROR_500);
		}
	},
};
