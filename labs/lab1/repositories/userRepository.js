const User = require('../models/user');
const JsonStorage = require('../jsonStorage');

class UserRepository {
  constructor(filePath) {
    this.storage = new JsonStorage(filePath);
  }
  addUser(User) {
    const data = this.storage.readItems();
    const items = data["items"];
    let newItem = {}
    newItem.id = data.nextId;
    newItem.login = User.login;
    newItem.fullname = User.fullname;
    newItem.role = User.role;
    newItem.registeredAt = User.registeredAt;
    newItem.avaUrl = User.avaUrl;
    newItem.isEnabled = User.isEnabled;
    items.push(newItem);
    this.storage.writeItems(data);
    this.storage.incrementNextId();
  }
  getUsers() {
    const items = this.storage.readItems();
    return items;
  }
  getUserById(id) {
    const items = this.storage.readItems();
    const item = items["items"].find(el => el.id == id);
    if (!item) return null;
    return new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled);
  }
  updateUser(User) {
    const items = this.storage.readItems();
    const itemIndex = items["items"].findIndex(el => el.id == User.id)
    if (itemIndex == -1) return 0;
    items["items"][itemIndex] = {
      "id": User.id,
      "login": User.login,
      "fullname": User.fullname,
      "role": User.role,
      "registeredAt": User.registeredAt,
      "avaUrl": User.avaUrl,
      "isEnabled": User.isEnabled
    }
    this.storage.writeItems(items);
    return 1;
  }
  deleteUser(id) {
    const items = this.storage.readItems();
    let itemIndex = items["items"].findIndex(el => el.id == id)
    if (itemIndex == -1) return 0;
    items["items"].splice(itemIndex, 1);
    this.storage.writeItems(items);
    return 1;
  }
};

module.exports = UserRepository;
