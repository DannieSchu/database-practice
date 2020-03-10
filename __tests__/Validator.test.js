const { Validator } = require('../lib/Validator.js');

describe('validator', () => {
  it('has field and constructor properties', () => {
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
