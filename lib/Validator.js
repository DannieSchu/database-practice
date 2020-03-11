const { getCaster } = require('./types.js')

// Create Validator
module.exports = class Validator {
  // Constructor should have two properties:
  constructor(field, configuration) {
    // field (needs to be validated)
    this.field = field;
    // configuration (tells us how we should validate)
    this.configuration = configuration;
  }
  // Write validate() method that takes an object
  validate(obj) {
    // casts to correct shape if wrong type (but can be validated)
    const caster = getCaster(this.configuration.type);
    // return value of field
    return caster(obj[this.field]);
    
    // throws error if field cannot be validated
  }
};  

