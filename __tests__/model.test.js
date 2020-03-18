// get model
const Model = require('../lib/Model');
const Schema = require('../lib/Schema');

describe('Model class', () => {
  let schema;

  describe('Model methods', () => {  
    beforeAll(() => {
      schema = new Schema({
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
    });
    
    it('creates a new document', () => {
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
      const Dog = new Model('Dog', schema);
      return Dog
        .find()
        .then(allDogs => {
          const mappedDogs = allDogs.map(dog => {
            return {
              _id: expect.any(String),
              name: dog.name,
              age: dog.age,
              weight: dog.weight
            };
          }
          );
          expect(allDogs).toEqual(mappedDogs);
        });  
    });

    it('updates a dog', () => {
      const Dog = new Model('Dog', schema);      
      return Dog
        .create({
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        }) 
        .then(dog => {
          return Dog
            .findByIdAndUpdate(dog._id, { name: 'rover' });
        })
        .then(updatedDog => {
          expect(updatedDog).toEqual({
            _id: expect.any(String),
            name: 'rover',
            age: 5,
            weight: '20 lbs'
          });
        });
    });

    it('deletes a dog', () => {
      const Dog = new Model('Dog', schema);      
      return Dog
        .create({
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        })
        .then(dog => {
          return Dog
            .findByIdAndDelete(dog._id);
        })
        .then(deletedDog => {
          expect(deletedDog).toBeUndefined;
        });
    });
  });
});
