const { AJV_OBJECTID } = require("../const");

module.exports = {
  getSchemaOrder(required = true) {
    return {
      type: "object",
      required: required
        ? ["basket", "client", "address"]
        : [],
      properties: {
        basket: {
          type: ["array"],
          items: {
            type: "object",
            required: ["dish", "number"],
            properties: {
              dish: {
                type: ["string"],
                minLength: 1,
                maxLength: 80,
              },
              number: {
                type: "number",
                minimum: 1,
              }
            }
          },
          minItems: 1
        },
        client: {
          type: ["string"],
          minLength: 1,
          pattern: AJV_OBJECTID
        },
        address: {
          type: ["string"],
          minLength: 1,
          maxLength: 80
        }
      }
    };
  }
};
