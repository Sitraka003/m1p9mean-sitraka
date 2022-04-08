module.exports.ROLES = [
	"Admim Ekaly",
	"Admin Restaurant",
	"Client",
	"Deliverer",
];
// for only function
module.exports.CLIENT_REGISTER = "name firstname address email contacts";
module.exports.USER_CREATE = "name firstname address email contacts";
module.exports.USER_UPDATE = "name firstname address contacts";
module.exports.USER_FIND =
	"name firstname address email contacts role restaurant";

// Message response
module.exports.ERROR_500 = {
	code: "INTERNAL_ERROR",
	message: "Something went wrong",
	data: {},
};
module.exports.INCORECT_VALUE = "INCORECT_VALUE";
