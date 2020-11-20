/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - Unique login
 * @property {string} fullname       - Name of the user
 * @property {integer} role          - Role (user (0) of admin (1))
 * @property {integer} registeredAt  - Date of registration
 * @property {string} avaUrl         - Link to avatar
 * @property {integer} isEnabled     - Is enabled
 */
class User {
  constructor(id = -1, login, fullname = null, role = null, registeredAt = null, avaUrl = null, isEnabled = null) {
    this.id = id;
    this.login = login;
    this.fullname = fullname;
    this.role = role;
    this.registeredAt = registeredAt;
    this.avaUrl = avaUrl;
    this.isEnabled = isEnabled;
  }
};

module.exports = User;
