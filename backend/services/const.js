module.exports.ROLES = [
	"Admim Ekaly",
	"Admin Restaurant",
	"Client",
	"Deliverer",
];
// for only function
module.exports.CLIENT_REGISTER =
	"name firstname address email contacts password confirmPassword";
module.exports.USER_CREATE = "name firstname address email role contacts";
module.exports.USER_UPDATE = "name firstname address contacts";
module.exports.USER_FIND =
	"_id name firstname address email contacts role restaurant";
module.exports.USER_FIND_POPULATE = "_id name firstname address email contacts";

module.exports.RESTO_CREATE = "name description address contacts tags";
module.exports.RESTO_FIND = "_id name description address contacts tags images";
module.exports.RESTO_UPDATE = "description address contacts tags";

module.exports.DISH_CREATE = "name description price tags restaurant images";
module.exports.DISH_FIND = "_id name description price status tags restaurant images";
module.exports.DISH_UPDATE = "name description price status tags";

module.exports.ORDER_CREATE = "basket client address";
module.exports.ORDER_CREATE_RETURNED =
	"_id orderId basket restaurant total client address status";
module.exports.ORDER_FIND =
	"_id orderId basket restaurant total client address status deliverer deliveryfee";

// Message response
module.exports.ERROR_500 = {
	code: "INTERNAL_ERROR",
	message: "Something went wrong",
	data: {},
};
module.exports.INCORRECT_VALUE = "INCORRECT_VALUE";

module.exports.AJV_EMAIL = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
module.exports.AJV_OBJECTID = "^[a-f\\d]{24}$";
module.exports.AJV_NUMTEL1 = "^03[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
module.exports.AJV_NUMTEL2 = "^3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
module.exports.AJV_NUMTEL3 =
	"^\\+?261\\s*3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
module.exports.AJV_GOOD_PASSWORD =
	"^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$";
