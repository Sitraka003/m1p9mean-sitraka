module.exports.sendResponse = (
	res,
	statusCode,
	param,
	message = "Something went wrong",
	data = {}
) => {
	if (typeof param === "object") {
		return res.status(statusCode).json(param);
	} else if (typeof param == "string") {
		const resp = {
			code: param,
			message: message,
			data: data,
		};
		return res.status(statusCode).json(resp);
	} else {
		const resp = {
			code: "INTERNAL_ERROR",
			message: "Something went wrong",
			data: {},
		};
		return res.status(statusCode).json(resp);
	}
};
