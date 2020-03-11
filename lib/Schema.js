// import validator class
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

// Schema creates validators for based on object passed in
module.exports = class Schema {
  validate(obj) {
    // create an array of validators by mapping through schema configuration and returning a new validator for each (name, age, weight)
    const validators = Object.entries(schemaDefinition).map(([field, configuration]) => new Validator(field, configuration));

    // instantiate object
    const validated = {};
    // iterate over validators
    validators.forEach(validator => {
      // cast item and put in new object
      validated[validator.field] = validator.validate(obj);
    });
    return validated;
  }
};

