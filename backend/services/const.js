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
	"_id name firstname address email contacts role restaurant";

module.exports.RESTO_CREATE = "name description address contacts tags";
module.exports.RESTO_FIND = "_id name description address contacts tags";
module.exports.RESTO_UPDATE = "description address contacts tags";

// Message response
module.exports.ERROR_500 = {
	code: "INTERNAL_ERROR",
	message: "Something went wrong",
	data: {},
};
module.exports.INCORECT_VALUE = "INCORECT_VALUE";
