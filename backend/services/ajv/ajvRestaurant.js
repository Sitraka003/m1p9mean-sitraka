const regexNumTel = "^03[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
const regexNumTel2 = "^3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";
const regexNumTel3 = "^\\+?261\\s*3[2-4,8]\\s*\\d{2}\\s*\\d{3}\\s*\\d{2}$";

module.exports = {
  getSchemaResto(required = true) {
    return {
      type: "object",
      required: required ? ["description", "name", "address", "contacts"] : [],
      properties: {
        name: {
          type: ["string"],
          minLength: 1,
          maxLength: 80
        },
        description: {
          type: ["string"],
          minLength: 1,
          maxLength: 160
        },
        address: {
          type: ["string"],
          minLength: 1,
          maxLength: 80
        },
        contacts: {
          oneOf: [
            { type: ["string"], pattern: regexNumTel },
            { type: ["string"], pattern: regexNumTel2 },
            { type: ["string"], pattern: regexNumTel3 },
            {
              type: "array",
              items: {
                oneOf: [
                  { type: ["string"], pattern: regexNumTel },
                  { type: ["string"], pattern: regexNumTel2 },
                  { type: ["string"], pattern: regexNumTel3 }
                ]
              }
            }
          ]
        },
        tags: {
          type: "array",
          items: {
            type: ["string", "null"],
            minLength: 0,
            maxLength: 80
          }
        }
      }
    };
  }
};
