const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { INCORECT_VALUE } = require("./const");

function processError(data, code, bool = false) {
	let details = [];
	data.filter(function (x) {
		if (bool) {
			details.push(x.params.missingProperty);
		} else {
			const temp = x.instancePath.split("/");
			details.push(temp[temp.length - 1]);
		}
	});
	return {
		code: code,
		message: "",
		data: [...new Set(details)],
	};
}

module.exports = {
	validate(errors) {
		const manquant = errors.filter(function (x) {
			return x.keyword === "required";
		});
		const incomplet = errors.filter(function (x) {
			return x.keyword === "minLength" && x.params.limit === 1;
		});
		const format = errors.filter(function (x) {
			return x.keyword === "format";
		});
		const incorrect = errors.filter(function (x) {
			return (
				x.keyword === "pattern" ||
				x.keyword === "type" ||
				x.keyword === "enum" ||
				x.keyword === "maxLength" ||
				x.keyword === "minimum" ||
				x.keyword === "maximum"
			);
		});
		if (manquant.length !== 0) {
			return processError(manquant, "MISSING_FIELD", true);
		}
		if (incomplet.length !== 0) {
			return processError(incomplet, "FIELD_EMPTY");
		}
		if (incorrect.length !== 0) {
			return processError(incorrect, "FIELD_INCORRECT");
		}
		if (format.length !== 0) {
			return processError(format, INCORECT_VALUE);
		}
	},
	checkWithAjv(schema, object) {
		let ajvValidator = new Ajv({ allErrors: true });
		addFormats(ajvValidator);
		const validate = ajvValidator.compile(schema);
		let result = validate(object);
		if (!result) {
			const errors = validate.errors;
			throw this.validate(errors);
		}
	},
};
