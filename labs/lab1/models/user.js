// models/user.js
class User {

    constructor( id, login, fullname, role, registeredAt, avaUrl, isEnabled ) {
        this.id = id;  // number
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role;  // string
        this.registeredAt = registeredAt;  // string
        this.avaUrl = avaUrl;  // string
        this.isEnabled = isEnabled;  // string
    }
 };
 
 module.exports = User;