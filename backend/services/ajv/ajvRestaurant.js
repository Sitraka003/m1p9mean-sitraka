const { AJV_NUMTEL1, AJV_NUMTEL2, AJV_NUMTEL3 } = require("../const");

module.exports = {
	getSchemaResto(required = true) {
		return {
			type: "object",
			required: required
				? ["description", "name", "address", "contacts"]
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
				address: {
					type: ["string"],
					minLength: 1,
					maxLength: 80,
				},
				contacts: {
					oneOf: [
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
				tags: {
					type: "array",
					items: {
						type: ["string", "null"],
						minLength: 0,
						maxLength: 80,
					},
				},
			},
		};
	},
};
