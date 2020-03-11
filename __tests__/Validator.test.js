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

  it('can validate an object of the proper type', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: true
    });
    const dog = {
      name: 'Hobbes',
      age: 23,
      weight: '15 lbs'
    };
    expect(nameValidator.validate(dog)).toEqual('Hobbes');
  })
});
