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
    // return value of field
    return obj[this.field];
    // casts to correct shape if wrong type (but can be validated)
    
    // throws error if field cannot be validated
  }
};  

