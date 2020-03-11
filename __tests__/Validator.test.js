const Validator = require('../lib/Validator.js');

describe('Validator', () => {
  it('has field and configuration properties', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: true
    });
  
    expect(nameValidator.field).toEqual('name');
    expect(nameValidator.configuration).toEqual({
      type: String,
      required: true
    });
  });
});
