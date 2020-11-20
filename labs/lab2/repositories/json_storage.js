const fs = require('fs');

class JsonStorage {
  constructor(filePath) {
    this.filePath = filePath;
  }
  readItems() {
    return JSON.parse(fs.readFileSync(this.filePath)).items;
  }
  writeItems(items) {
    const data = JSON.parse(fs.readFileSync(this.filePath));
    data.items = items;
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
  incrementNextId() {
    const data = JSON.parse(fs.readFileSync(this.filePath));
    data.nextId++;
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
  nextId() {
    return (JSON.parse(fs.readFileSync(this.filePath))).nextId;
  }
};

module.exports = JsonStorage;
