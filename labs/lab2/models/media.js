const Path = require('path');

class Media {
  constructor(path) {
    this.path = Path.resolve(path);
  }
}

module.exports = Media;
