// get model
const Model = require('../lib/Model');
// get schema 
const Schema = require('../lib/Schema');
// const removeDir = require('../lib/file-system');

// let schema;

describe('Model class', () => {
  // beforeEach(() => removeDir('Dog'));

  // beforeAll(() => {
  //   schema = new Schema('name', {
  //     type: String,
  //     required: true
  //   },
  //   'age', {
  //     type: Number,
  //     required: true
  //   },
  //   'weight', {
  //     type: String
  //   }
  //   );   
  // });
  it('creates a new document', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
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

  it('finds an object by its id', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      weight: {
        type: String
      }
    });  

    // Dog class is a new model with name 'Dog' in shape of schema
    const Dog = new Model('Dog', schema);

    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })      
      .then(dog => {
        return Dog 
          .findById(dog._id);
      })
      .then(foundDog => {
        expect(foundDog).toEqual({
          _id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });

  it('finds all dogs', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      weight: {
        type: String
      }
    });  

    // Dog class is a new model with name 'Dog' in shape of schema
    const Dog = new Model('Dog', schema);

    return Dog
      .find()
      .then(allDogs => {
        expect(allDogs).toEqual([{
          _id: expect.any(String),
          name: expect.any(String),
          age: expect.any(Number),
          weight: expect.any(String)
        }]);
      });
  });
});
// .then(dog => {
//   return Dog
//     .findByIdAndUpdate(dog._id, { name: 'rover' });
// })

// .then(updatedDog => {
//   expect(updatedDog).toEqual({
//     _id: expect.any(String),
//     name: 'rover',
//     age: 5,
//     weight: '20 lbs'
//   });
