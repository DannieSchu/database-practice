/* eslint-disable indent */
const fs = require('fs').promises;
const { 
  mkdirp, 
  writeJSON, 
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteJSON,
  clearDir
} = require('./file-system.js');

// set up jest.mock() functions that each return a promise 
jest.mock('fs', () => ({
  // create promises
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"name": "Hobbes"}')),
    readdir: jest.fn(() => Promise.resolve(['file-one.json', 'file-two.json'])),
    unlink: jest.fn(() => Promise.resolve())
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

    it('reads an object from a file', () => {
      return readJSON('./test.json')
        .then(results => {
        // ensure that readFile is called with right arguments
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json');
          // ensure data is an object rather than a string
        expect(results)
          .toEqual({ name: 'Hobbes' });
        });    
    });
    
    it('reads a directory', () => {
      return readDirectoryJSON('./file-directory')
        .then(results => {
          // ensure that readdir is called with right arguments
          expect(fs.readdir)
            .toHaveBeenCalledWith('./file-directory');
            // ensure that readFile is called with right arguments
          expect(fs.readFile)
            .toHaveBeenCalledWith('./file-directory/file-one.json');
          expect(fs.readFile)
            .toHaveBeenCalledWith('./file-directory/file-two.json');
            // ensure data takes right shape
          expect(results)
            .toEqual([
              { name: 'Hobbes' }, 
              { name: 'Hobbes' }
            ]);
        }
      );
    });

    it('updates a file', () => {
      return updateJSON('./test.json', { name: 'Hobbes' })
      .then(results => {
        // ensure that readFile gets called with right arguments
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json');
        // ensure that writeFile gets called with right arguments
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test.json', '{"name":"Hobbes"}');
        // expect results to equal object with appropriate name
        expect(results).toEqual({ 
          name: 'Hobbes' 
        });
        });
    });

    it('deletes a file', () => {
      return deleteJSON('./test.json')
        .then(() => {
          // ensure that unlink gets called with right arguments
          expect(fs.unlink)
            .toHaveBeenCalledWith('./test.json');
        });
    });

    it('removes a directory', () => {
      const dog = {
        name: 'Hobbes',
        age: 20,
        weight: '20 lbs'
      };
      // return function
      return writeJSON('./test.json', dog)
        .then(() => clearDir('./test.json'))
        .then(() => {
          expect('./test.json').toBeUndefined;
      });
    });
  });
