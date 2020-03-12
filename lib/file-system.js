const fs = require('fs').promises;

// make directory
const mkdirp = path => {
  return fs.mkdir(path, { recursive: true });
};


module.exports = { mkdirp };
