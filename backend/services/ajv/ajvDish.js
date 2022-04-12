const { AJV_OBJECTID } = require("../const");

module.exports = {
	getSchemaDish(required = true) {
		return {
			type: "object",
			required: required
				? ["description", "name", "price", "restaurant"]
				: [],
			properties: {
				name: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				description: {
					type: ["string"],
					minLength: 1,
					maxLength: 1200,
				},
				price: {
					type: ["string", "number"],
					minLength: 3,
					maxLength: 8,
				},
				tags: {
					type: "array",
					items: {
						type: ["string", "null"],
						minLength: 0,
						maxLength: 80,
					},
				},
				status: {
					type: "number",
					minimum: 0,
					maximum: 2,
				},
				restaurant: {
					type: ["string"],
					minLength: 1,
					pattern: AJV_OBJECTID,
				},
			},
		};
	},
};
