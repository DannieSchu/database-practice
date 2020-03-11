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
  });

  it('can validate an object that is not proper type but is castable', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: true
    });  
    const dog = {
      name: 2,
      age: 23,
      weight: '15 lbs'
    };
    expect(nameValidator.validate(dog)).toEqual('2');
  });

  it('throws an error when object is wrong type and not castable', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: true
    });  
    const dog = {
      name: {},
      age: 23,
      weight: '15 lbs'
    };
    expect(() => nameValidator.validate(dog).toThrowError('Cannot cast >>[object Object]<< to String'));
  });

  it('throws an error when validating if a required value is missing', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: true
    });  
    const dog = {
      age: 23,
      weight: '15 lbs'
    };
    expect(() => nameValidator.validate(dog).toThrowError('Missing required field >>name<<'));
  });

  it('returns null if optional value is missing', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: false
    });  
    const dog = {
      age: 23,
      weight: '15 lbs'
    };
    expect(nameValidator.validate(dog)).toEqual(null);
  });
});
