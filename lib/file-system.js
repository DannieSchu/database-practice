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

// read directory
const readDirectoryJSON = path => {
  return fs.readdir(path)
  // get array of all file names in directory
    .then(files => {
      // for each file name, read the file (these are promises to get the files)
      const readAllFiles = files.map(file => readJSON(`${path}/${file}`));
      // wait for all to be read
      return Promise.all(readAllFiles);
    });
};

// update file
const updateJSON = (path, obj) => {
  // read file
  return readJSON(path)
    // get contents of file
    .then(contents => {
      // construct new object using only keys specified in obj (spreading updates json with everything in obj)
      const updatedJSON = { ...contents, ...obj };
      // write new file with updated obj
      return writeJSON(path, updatedJSON);
    });
}; 

// delete file by unlinking path
const deleteJSON = path => fs.unlink(path);

// remove directory

// const clearDir = path => {
//   return fs.readdir(path)
//     .then(files => {
//       return files.forEach(file => deleteJSON(`${path}/${file}`));
//     });
// .then(() => fs.rmdir(path, { recursive: true }));
// };

module.exports = { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteJSON };
