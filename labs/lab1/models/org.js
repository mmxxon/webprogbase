class Org {
    constructor(id, name, founder, founded, employers, isActive) {
        this.id = Number(id);                // number
        this.name = name;            // string
        this.founder = founder;      // string
        this.founded = founded;      // iso date
        this.employers = employers;  // number
        this.isActive = isActive;    // number
    }
};

module.exports = Org;