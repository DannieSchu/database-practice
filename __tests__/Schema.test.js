const Schema = require('../lib/Schema.js');

describe('Schema', () => {
  let dogSchema;
  
  beforeEach(() => {
    dogSchema = new Schema('dog', {
      name: String,
      age: Number,
      weight: String
    });
  });

  it('returns object with all fields set', () => {
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

  it('returns object if optional values are missing', () => {
    const rover = {
      name: 'rover',
      age: 5,
    };

    expect(dogSchema.validate(rover)).toEqual({
      name: 'rover',
      age: 5
    });
  });


  it('throws an error if object does not follow schema', () => {
    const who = {
      age: 'hi'
    };

    expect(() => dogSchema.validate(who).toThrowError('Cannot cast >>[object Object]<< to String'));
  });
});
