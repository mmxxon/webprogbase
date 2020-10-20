const Org = require('../models/org');
const JsonStorage = require('../jsonStorage');
 
class OrgRepository {
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
    addOrg(Org) {
        const data = this.storage.readItems();
        const items = data["items"];
        let newItem = {}
        newItem.id = data.nextId;
        newItem.name = Org.name;
        newItem.founder = Org.founder;
        newItem.founded = Org.founded;
        newItem.employers = Org.employers;
        newItem.isActive = Org.isActive;
        items.push(newItem);
        this.storage.writeItems(data);
        this.storage.incrementNextId();
    }
    getOrgs() { 
        const items = this.storage.readItems();
        return items;
    }
    getOrgById(id) {
        const items = this.storage.readItems();
        const item = items["items"].find(el => el.id == id);
        if (!item) return null;
        return new Org(item.id, item.name, item.founder, item.founded, item.employers, item.isActive);
    }
    updateOrg(Org) {
        const items = this.storage.readItems();
        const itemIndex = items["items"].findIndex(el => el.id == Org.id)
        if (itemIndex == -1) return 0;
        items["items"][itemIndex] = {
            "id": Org.id,
            "name": Org.name,
            "founder": Org.founder,
            "founded": Org.founded,
            "employers": Org.employers,
            "isActive": Org.isActive
        }
        this.storage.writeItems(items);
        return 1;
    }
    deleteOrg(id) {
        const items = this.storage.readItems();
        let itemIndex = items["items"].findIndex(el => el.id == id)
        if (itemIndex == -1) return 0;
        items["items"].splice(itemIndex, 1);
        this.storage.writeItems(items);
        return 1;
    }
};
 
module.exports = OrgRepository;
