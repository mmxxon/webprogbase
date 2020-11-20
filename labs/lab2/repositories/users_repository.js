const User = require('../models/user');
const JsonStorage = require('./json_storage');

class UserRepository {
  constructor(filePath) {
    this.storage = new JsonStorage(filePath);
  }
  GetUsers() {
    const items = this.storage.readItems();
    const users = [];
    for (let item of items) {
      users.push(new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled));
    }
    return users;
  }
  GetUserById(id) {
    const items = this.storage.readItems();
    const item = items.find(el => el.id === id);
    return (!item) ? null : new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled);
  }
  AddUser(user) {
    if (!user.login) throw new Error("No user login provided");
    const items = this.storage.readItems();
    user.id = this.storage.nextId();
    items.push(user);
    this.storage.writeItems(items);
    this.storage.incrementNextId();
    return user.id;
  }
  UpdateUser(user) {
    if (!user.login) throw new Error("No user login provided");
    const items = this.storage.readItems();
    const itemIndex = items.findIndex(el => el.id === user.id);
    if (itemIndex === -1) return false;
    items.splice(itemIndex, 1, user);
    this.storage.writeItems(items);
    return true;
  }
  DeleteUser(id) {
    const items = this.storage.readItems();
    const itemIndex = items.findIndex(el => el.id === id);
    if (itemIndex === -1) return false;
    items.splice(itemIndex, 1);
    this.storage.writeItems(items);
    return true;
  }
}

module.exports = UserRepository;
