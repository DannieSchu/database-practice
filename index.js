// const { isNumber } = require('./lib/types.js');

// console.log(isNumber('3'));

const fs = require('fs');
fs.readFile('./README.md', { encoding: 'utf8' }, (err, data) => {
  if(err) return console.log(err);
  console.log('my file', data);
  fs.writeFile('./README=copy.md', data.toUpperCase(), err => {
    console.log('done copying');
  });
});
console.log('start!');
