const Org = require('../models/org');
const JsonStorage = require('./json_storage');

class OrgRepository {
  constructor(filePath) {
    this.storage = new JsonStorage(filePath);
  }
  GetOrgs() {
    const items = this.storage.readItems();
    const orgs = [];
    for (let item of items) {
      orgs.push(new Org(item.id, item.name, item.founder, item.founded, item.employers, item.isActive));
    }
    return orgs;
  }
  GetOrgById(id) {
    const items = this.storage.readItems();
    const item = items.find(el => el.id === id);
    return (!item) ? null : new Org(item.id, item.name, item.founder, item.founded, item.employers, item.isActive);
  }
  AddOrg(org) {
    if (!org.name) throw new Error("No organisation name provided");
    const items = this.storage.readItems();
    org.id = this.storage.nextId();
    items.push(org);
    this.storage.writeItems(items);
    this.storage.incrementNextId();
    return org.id;
  }
  UpdateOrg(org) {
    if (!org.name) throw new TypeError("No organisation name provided");
    const items = this.storage.readItems();
    const itemIndex = items.findIndex(el => el.id === Org.id);
    if (itemIndex === -1) return false;
    items.splice(itemIndex, 1, org);
    this.storage.writeItems(items);
    return true;
  }
  DeleteOrg(id) {
    const items = this.storage.readItems();
    const itemIndex = items.findIndex(el => el.id === id);
    if (itemIndex === -1) return false;
    items.splice(itemIndex, 1);
    this.storage.writeItems(items);
    return true;
  }
}

module.exports = OrgRepository;
