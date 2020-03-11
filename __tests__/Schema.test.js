const Schema = require('../lib/Schema.js');

describe('Schema', () => {
  it('returns object with all fields set', () => {
    const dogSchema = new Schema('dog', {
      name: String,
      age: Number,
      weight: String
    });
    const spot = {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    };
    
    expect(dogSchema.validate(spot)).toEqual({
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });
  });

  // it('throws an error if object does not follow schema', () => {

  // });
});

// use the object to create an array of Validators for each key/value in schemaDefinition and store the array in this.validators 

//Schema has a validate method that takes an object
