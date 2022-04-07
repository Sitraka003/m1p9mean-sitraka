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
} = require("../services/const");
const md5 = require("md5");

module.exports = {
	async registerClient(req, res) {
		// Validate the input from user
		try {
			const ajvContact = ajvUserService.getSchemaCreateUser();
			ajvService.checkWithAjv(ajvContact, req.body);
		} catch (e) {
			return sendResponse(res, 400, e);
		}

		// Insert into User
		const body = only(req.body, CLIENT_REGISTER);
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
};
