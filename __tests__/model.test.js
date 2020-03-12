// get model
const Model = require('../lib/Model');
// get schema 
const Schema = require('../lib/Schema');

describe('Model class', () => {
  it('creates a new document', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      weight: {
        type: String
      }
    });  
    // Dog class is a new model with name 'Dog' in shape of schema
    const Dog = new Model('Dog', schema);

    return Dog 
    // create this instance of Dog class 
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      // expect dog to equal this
      .then(dog => {
        expect(dog).toEqual({
          _id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });

  });
});

