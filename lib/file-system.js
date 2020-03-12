const fs = require('fs').promises;

// make directory
const mkdirp = path => {
  return fs.mkdir(path, { recursive: true });
};

// write file
const writeJSON = (path, obj) => {
  // return writeFile taking in path and object (stringified)
  return fs.writeFile(path, JSON.stringify(obj))
  // if it exists, return it as an object
    .then(() => obj);
};

// read file
const readJSON = path => {
  // return readFile that takes in path
  return fs.readFile(path)
  // if it exists, parse it
    .then(results => JSON.parse(results)
    );
};

module.exports = { mkdirp, writeJSON, readJSON };
