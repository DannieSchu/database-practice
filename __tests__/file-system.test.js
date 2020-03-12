/* eslint-disable indent */
const fs = require('fs').promises;
const { 
  mkdirp, 
  writeJSON 
} = require('../lib/file-system.js');

// set up jest.mock() functions that each return a promise 
jest.mock('fs', () => ({
  // create promises
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve())
    }
}));

// make directory and make sure directory exists
describe('file system functions', () => {
  it('makes a directory and all parent directories', () => {
    // attempt to create path
    return mkdirp('./file-directory')
    // if directory exists
      .then(() => {
        // intercept fs with promise; expect that it will be called with appropriate arguments
        expect(fs.mkdir).toHaveBeenCalledWith('./file-directory', { recursive: true });
      });
    });

    it('writes a file', () => {
      const dog = {
        name: 'Hobbes',
        age: 20,
        weight: '20 lbs'
      };
      // return function
      return writeJSON('./test.json', dog)
        // check that called with correct arguments
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('./test.json', JSON.stringify(dog));
      });
    });
  });

