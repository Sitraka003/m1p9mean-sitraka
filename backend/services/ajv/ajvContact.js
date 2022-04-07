const regexEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

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
					pattern: regexEmail,
				},
			},
		};
	},
};
