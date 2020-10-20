const fs = require('fs');
 
class JsonStorage {
    constructor(filePath) {
        this.filePath = filePath;
    }
    readItems() {
        const jsonText = fs.readFileSync(this.filePath);
        const jsonArray = JSON.parse(jsonText);
        return jsonArray;
    }
    writeItems(items) {
        fs.writeFileSync(this.filePath, JSON.stringify(items, null, 4));
    }
    incrementNextId() {
        const jsonText = fs.readFileSync(this.filePath)
        const jsonArray = JSON.parse(jsonText);
        jsonArray.nextId++;
        fs.writeFileSync(this.filePath, JSON.stringify(jsonArray, null, 4));
    }
};
 
module.exports = JsonStorage;
