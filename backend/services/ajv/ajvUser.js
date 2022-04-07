const regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
const regexNumTel = "^03[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
const regexNumTel2 = "^3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
const regexNumTel3 = "^\\+?261\\s*3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
const goodPassword = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$";

module.exports = {
	getSchemaCreateUser() {
		return {
			type: "object",
			required: ["name", "email", "password"],
			properties: {
				name: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				firstname: {
					type: ["string"],
					maxLength: 80,
				},
				address: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				email: {
					type: ["string"],
					minLength: 1,
					pattern: regexEmail,
				},
				password: {
					type: ["string"],
					minLength: 8,
					pattern: goodPassword,
				},
				contacts: {
					oneOf: [
						// Case of null contact or empty string
						{
							type: ["string", "null"],
							maxLength: 0,
						},
						{ type: ["string"], pattern: regexNumTel },
						{ type: ["string"], pattern: regexNumTel2 },
						{ type: ["string"], pattern: regexNumTel3 },
						{
							type: "array",
							items: {
								oneOf: [
									{ type: ["string"], pattern: regexNumTel },
									{ type: ["string"], pattern: regexNumTel2 },
									{ type: ["string"], pattern: regexNumTel3 },
								],
							},
						},
					],
				},
			},
		};
	},
};
