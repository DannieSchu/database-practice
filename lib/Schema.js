const Validator = require(('./Validator.js'));
  
// initialize object defining a schema
const schemaDefinition = {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String
  }
};

// create validators based on object passed in
module.exports = class Schema {
  validate(obj) {
    // create an array of validators
    const validators = Object.entries(schemaDefinition).map(([field, configuration]) => new Validator(field, configuration));
    // instantiate object
    const validated = {};
    // iterate over validators
    validators.forEach(validator => {
      // cast item and put in new object
      validated[validator.field] = validator.validate(obj);
      // handle null values
      if(!validated[validator.field] && !validated[validator.configuration.required]) {
        delete validated[validator.field];
      }
    });
    return validated;
  }
};
