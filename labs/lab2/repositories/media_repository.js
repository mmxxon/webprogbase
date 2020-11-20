const Path = require('path');
const fs = require('fs');

const Media = require('../models/media');

class MediaRepository {
  constructor(storage) {
    this.storage = storage;
  }
  GetMediaById(id) {
    const path = Path.join(this.storage, id);
    if (fs.existsSync(path)) {
      return new Media(path);
    }
    return null;
  }
  AddMedia(media) {
    const nextId = JSON.parse(fs.readFileSync(Path.join(this.storage, 'nextId.json')));
    const path = Path.join(this.storage, `${nextId.value}`);

    fs.renameSync(media.path, path);
    nextId.value += 1;
    fs.writeFileSync(Path.join(this.storage, "nextId.json"), JSON.stringify(nextId));
    return nextId.value - 1;
  }
}

module.exports = MediaRepository;
