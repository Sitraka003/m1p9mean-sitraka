const { AJV_EMAIL, AJV_NUMTEL1, AJV_NUMTEL2, AJV_NUMTEL3, AJV_GOOD_PASSWORD } = require("../const");
const { ROLES } = require("../const");
const rolePattern = `^${ROLES.reduce(
	(all, newItem) => `${all}$|^${newItem}`
)}$`;

const commonInfo = {
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
	contacts: {
		oneOf: [
			// Case of null contact or empty string
			{
				type: ["string", "null"],
				maxLength: 0,
			},
			{ type: ["string"], pattern: AJV_NUMTEL1 },
			{ type: ["string"], pattern: AJV_NUMTEL2 },
			{ type: ["string"], pattern: AJV_NUMTEL3 },
			{
				type: "array",
				items: {
					oneOf: [
						{ type: ["string"], pattern: AJV_NUMTEL1 },
						{ type: ["string"], pattern: AJV_NUMTEL2 },
						{ type: ["string"], pattern: AJV_NUMTEL3 },
					],
				},
			},
		],
	},
};

module.exports = {
	getSchemaRegister() {
		return {
			type: "object",
			required: ["name", "email", "password", "confirmPassword"],
			properties: {
				email: {
					type: ["string"],
					minLength: 1,
					pattern: AJV_EMAIL,
				},
				password: {
					type: ["string"],
					minLength: 8,
					pattern: AJV_GOOD_PASSWORD,
				},
				confirmPassword: {
					type: ["string"],
					minLength: 8,
					pattern: AJV_GOOD_PASSWORD,
				},
				...commonInfo,
			},
		};
	},

	getSchemaCreateUser() {
		return {
			type: "object",
			required: ["name", "email"],
			properties: {
				email: {
					type: ["string"],
					minLength: 1,
					pattern: AJV_EMAIL,
				},
				role: {
					oneOf: [
						{
							type: ["string", "null"],
							maxLength: 0,
						},
						{
							type: ["string"],
							pattern: rolePattern,
						},
					],
				},
				...commonInfo,
			},
		};
	},

	getSchemaUpdateUser() {
		return {
			type: "object",
			properties: {
				...commonInfo,
			},
		};
	},
};
