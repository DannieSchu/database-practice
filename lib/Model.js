const uuid = require('uuid/v4');

const { mkdirp, 
  writeJSON,
  readJSON,
  readDirectoryJSON
} = require('./file-system');

module.exports = class Model {
  // construct Model class
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    // create schema using modelName
    mkdirp(this.modelName);
  }

  create(obj) {
    const _id = uuid();
    // validate schema
    const validated = this.schema.validate(obj);
    // create object using validated schema
    // path should be modelName/id
    // add id to validated object
    return writeJSON(`${this.modelName}/${_id}`, { ...validated, _id });
  }

  findById(id) {
    return readJSON(`${this.modelName}/${id}`);
  }

  find() {
    return readDirectoryJSON(`${this.modelName}`);
  }
};
