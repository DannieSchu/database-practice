/* eslint-disable indent */
const fs = require('fs').promises;
const { writeJSON } = require('../lib/file-system.js');

const dog = {
  name: 'Hobbes',
  age: 21,
  weight: '15 lbs'
};

describe('write function', () => {
  afterEach(() => {
    return fs.unlink('./json-file.txt');
  });

  it('writes a file', () => {
    // promise: it writes this object at this file path...
    return writeJSON('./json-file.txt', dog)
      // if promise is fulfilled, it reads the file
      .then(() => fs.readFile('./json-file.txt'))
      .then((contents) => JSON.parse(contents))
      // if it reads the file, it returns that result 
      .then(result => {
        expect(result).toEqual(
          { name: 'Hobbes',
            age: 21,
            weight: '15 lbs' 
          }
        );
      });
  });
});
