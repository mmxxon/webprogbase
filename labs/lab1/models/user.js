class User {
  constructor(id, login, fullname, role, registeredAt, avaUrl, isEnabled) {
    this.id = Number(id);                        // number
    this.login = login;                  // string
    this.fullname = fullname;            // string
    this.role = Number(role);                    // number
    this.registeredAt = registeredAt;    // iso date
    this.avaUrl = avaUrl;                // string
    this.isEnabled = Number(isEnabled);          // number
  }
};

module.exports = User;
