const objectId = "^[a-f\\\\d]{24}$";

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
					maxLength: 160,
				},
				price: {
					type: ["string"],
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
				etat: {
					type: Number,
					min: 0,
					max: 2,
				},
				restaurant: {
					type: ["string"],
					minLength: 1,
					pattern: objectId,
				},
			},
		};
	},
};
