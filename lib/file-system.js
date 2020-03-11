const fs = require('fs').promises;

// writeJSON: needs to write a JSON file
// takes in a path and an object
function writeJSON(path, obj) {
  // stringify
  return fs.writeFile(path, JSON.stringify(obj));
}

module.exports = { writeJSON };


// read a json file
// read a directory of json files (fs.readdir -> [] -> Promise.all with readJson)
// update a json file
// delete a file
