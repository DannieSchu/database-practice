const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
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

const Dog = mongoose.model('Dog', dogSchema);

mongoose.connect('mongodb://localhost:27017/sandbox');

// C - CREATE POST
Dog
  .create({
    name: 'spot',
    age: 5,
    weight: '20 lbs'
  })
    .then(createdDog => console.log(createdDog));

// R - READ MANY GET
Dog
  .find()
  .then(allDogs => console.log(allDogs));

// R - READ ONE GET
Dog
  .findById('ID')
  .then(dog => console.log(dog));

// U - UPDATE patch/put
Dog
  .findByIdAndUpdate('ID', { age: 10 }, { new: true })
  .then(updateDog => console.log(updateDog));

// D - DELETE delete
Dog
  .findByIdAndDelete('ID')
  .then(deletedDog => console.log(deletedDog));

// // UPDATE dogs (age) VALUES (10) WHERE id = '132321312';
// Dog
//   .findByIdAndDelete('5e6a643f2153f477a0ec8a76')
//   .then(createdDog => console.log(createdDog))
//   .finally(() => mongoose.connection.close())
