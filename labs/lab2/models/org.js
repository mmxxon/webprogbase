/**
 * @typedef Org
 * @property {integer} id           - Unique id
 * @property {string} name.required - Name
 * @property {string} founder       - Founder
 * @property {string} founded       - Founder
 * @property {integer} employers    - Count of employers
 * @property {integer} isActive     - Status of active
 */
class Org {
  constructor(id = -1, name, founder = null, founded = null, employers = null, isActive = null) {
    this.id = id;
    this.name = name;
    this.founder = founder;
    this.founded = founded;
    this.employers = employers;
    this.isActive = isActive;
  }
};

module.exports = Org;
