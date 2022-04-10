const { AJV_EMAIL } = require("../const");

module.exports = {
	getSchemaContact() {
		return {
			type: "object",
			required: ["email", "name", "title", "message"],
			properties: {
				name: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				title: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				message: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				email: {
					type: ["string"],
					minLength: 1,
					pattern: AJV_EMAIL,
				},
			},
		};
	},
};
