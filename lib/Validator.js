const { getCaster } = require('./types.js');

module.exports = class Validator {
  // define field and configuration properties of 
  constructor(field, configuration) {
    this.field = field;
    this.configuration = configuration;
  }
  validate(obj) {
    // handle missing values (if required)
    if(this.configuration.required && !(this.field in obj)) {
      throw new Error(`Missing required field >>${this.field}<<`);
    }
    // handle missing values (if not required)
    if(!(this.field in obj) && !this.configuration.required) {
      return null;
    }
    // cast to correct shape if wrong type (but can be validated)
    const caster = getCaster(this.configuration.type);
    // return value of field
    return caster(obj[this.field]);
  }
};  

