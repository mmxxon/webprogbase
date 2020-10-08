// repositories/user_repository.js
const User = require('./../models/user');
const JsonStorage = require('../jsonStorage');
 
class UserRepository {
 
    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }
 
    getUsers() { 
        return this.storage.readItems();
    }
 
    getUserById(id) {
        const items = this.storage.readItems();
        for ( const item in items ) {
            if ( item.id === id ) {
                return new User ( item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled );
            }
        }
    }
};
 
module.exports = UserRepository;
