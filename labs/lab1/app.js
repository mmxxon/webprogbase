const readline = require("readline-sync");
const {DateTime} = require("luxon");

const userRepo = require("./repositories/userRepository");
const orgRepo = require("./repositories/orgRepository");
const {clear} = require("console");
const Org = require("./models/org");
const User = require("./models/user");

const UserRepo = new userRepo("./data/users.json");
const OrgRepo = new orgRepo("./data/orgs.json"); 
var args = process.argv.slice(2);
var help = `    Avilable commands:

    get/{entities}/[id]     -- Return entity(ies)
    delete/{entities}/{id}  -- Delete entity
    update/{entities}/{id}  -- Change entity fields
    post/{entities}         -- Create new entity
`;

if (args.length !== 0) {
    if (args[0] === "--help")
        console.log(help);
     else
        console.log("Wrong command");



    process.exit(0);
}

while (true) {
    clear();
    let input = readline.question("Enter command: ").toLowerCase().split("/");
    let entity = (input.length > 1 ? input[1] : readline.question("Enter entity: ")).toLowerCase();
    if (entity !== "user" && entity !== "org") {
        console.log("Wrong entity");
        readline.question("Press any key to continue...");
        continue;
    }

    if (input[0] === "get") {
        let id = input.length > 2 ? input[2] : readline.question("Enter id (skip to show all): ");
        if (id.length == 0) {
            if (entity === "user") {
                UserRepo.getUsers()["items"].forEach((el) => {
                    console.log(`${
                        el.id
                    }) name: ${
                        el.fullname
                    } | login: ${
                        el.login
                    }`);
                });
            } else {
                OrgRepo.getOrgs()["items"].forEach((el) => {
                    console.log(`${
                        el.id
                    }) name: ${
                        el.name
                    } | employers: ${
                        el.employers
                    }`);
                });
            }
        } else {
            if (!isFinite(id)) {
                console.log("ID must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            if (entity === "user") {
                let user = UserRepo.getUserById(id);
                if (user) {
                    console.log(`ID: ${
                        user.id
                    }\nLogin: ${
                        user.login
                    }\nFullname: ${
                        user.fullname
                    }\nRole: ${
                        user.role
                    }\nRegistration Date: ${
                        user.registeredAt
                    }\nAvatar link: ${
                        user.avaUrl
                    }\nIs enabled: ${
                        user.isEnabled
                    }`);
                } else {
                    console.log("User not found");
                }
            } else {
                let org = OrgRepo.getOrgById(id);
                if (org) {
                    console.log(`ID: ${
                        org.id
                    }\nName: ${
                        org.name
                    }\nFounder: ${
                        org.founder
                    }\nDate of foundation: ${
                        org.founded
                    }\nEmployers: ${
                        org.employers
                    }\nIs active: ${
                        org.isActive
                    }`);
                } else {
                    console.log("User not found");
                }
            }
        }
    } else if (input[0] === "post") {
        if (entity === "user") {
            let login = readline.question("Login: ");
            let name = readline.question("Full name: ");
            let role = readline.question("Role (0 for user, 1 for admin): ");
            if (!["1", "0"].includes(role)) {
                clear();
                console.log("Wrong role");
                readline.question("Press any key to continue...");
                continue;
            }
            let year = readline.question("Year of registration: ");
            let month = readline.question("Month of registration: ");
            let day = readline.question("Day of registration: ");
            dt = DateTime.fromObject({"day": day, "month": month, "year": year});
            if (!dt.isValid) {
                clear();
                console.log("Wrong date");
                readline.question("Press any key to continue...");
                continue;
            }
            let date = dt.toISODate();
            let ava = readline.question("Link to avatar: ");
            let enabled = readline.question("Is account currently enabled (0/1): ");
            if (!["1", "0"].includes(enabled)) {
                clear();
                console.log("Wrong role");
                readline.question("Press any key to continue...");
                continue;
            }
            UserRepo.addUser(new User(-1, login, name, role, date, ava, enabled));
        } else {
            let name = readline.question("Name: ");
            let founder = readline.question("Founder: ");
            let year = readline.question("Year of foundation: ");
            let month = readline.question("Month of foundation: ");
            let day = readline.question("Day of foundation: ");
            dt = DateTime.fromObject({"day": day, "month": month, "year": year});
            if (!dt.isValid) {
                clear();
                console.log("Wrong date");
                readline.question("Press any key to continue...");
                continue;
            }
            let date = dt.toISODate();
            let employers = readline.question("Employers count: ");
            if (!isFinite(employers)) {
                console.log("Count must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            let active = readline.question("Is currently active (0/1): ");
            if (!["1", "0"].includes(active)) {
                clear();
                console.log("Wrong role");
                readline.question("Press any key to continue...");
                continue;
            }
            OrgRepo.addOrg(new Org(-1, name, founder, date, employers, active));
        }
    } else if (input[0] === "update") {
        if (entity === "user") {
            let id = readline.question("ID of user: ");
            if (!isFinite(id)) {
                console.log("ID must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            let user = UserRepo.getUserById(id);
            if (! user) {
                console.log("User not found");
                readline.question("Press any key to continue...");
                continue;
            }
            let login = readline.question("Login (skip to not change): ");
            login = (login.length == 0) ? user.login : login;
            let name = readline.question("Full name (skip to not change): ");
            name = (name.length == 0) ? user.name : name;
            let role = readline.question("Role (0 for user, 1 for admin, skip to not change): ");
            role = (role.length == 0) ? user.role.toString() : role;
            if (!["1", "0"].includes(role)) {
                clear();
                console.log("Wrong role");
                readline.question("Press any key to continue...");
                continue;
            }
            let registered = DateTime.fromISO(user.registeredAt);
            let year = readline.question("Year of registration (skip to not change): ");
            year = (year.length == 0) ? registered.year : year;
            let month = readline.question("Month of registration (skip to not change): ");
            month = (month.length == 0) ? registered.month : month;
            let day = readline.question("Day of registration (skip to not change): ");
            day = (day.length == 0) ? registered.day : day;
            dt = DateTime.fromObject({"day": day, "month": month, "year": year});
            if (!dt.isValid) {
                clear();
                console.log("Wrong date");
                readline.question("Press any key to continue...");
                continue;
            }
            let date = dt.toISODate();
            let ava = readline.question("Link to avatar (skip to not change): ");
            ava = (ava.length == 0) ? user.avaUrl : ava;
            let enabled = readline.question("Is account currently enabled (0/1, skip to not change): ");
            enabled = (enabled.length == 0) ? user.isEnabled.toString() : enabled;
            if (!["1", "0"].includes(enabled)) {
                clear();
                console.log("Wrong role");
                readline.question("Press any key to continue...");
                continue;
            }
            console.log(UserRepo.updateUser(new User(id, login, name, role, date, ava, enabled)) ? "Updated successfully" : "Update failed");
        } else {
            let id = readline.question("ID of organisation: ");
            if (!isFinite(id)) {
                console.log("ID must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            let org = OrgRepo.getOrgById(id);
            if (! org) {
                console.log("Organisation not found");
                readline.question("Press any key to continue...");
                continue;
            }
            let name = readline.question("Name (skip to not change): ");
            name = (name.length == 0) ? org.name : name;
            let founder = readline.question("Founder (skip to not change): ");
            founder = (founder.length == 0) ? org.founder : founder;
            let founded = DateTime.fromISO(org.founded);
            let year = readline.question("Year of foundation (skip to not change): ");
            year = (year.length == 0) ? founded.year : year;
            let month = readline.question("Month of foundation (skip to not change): ");
            month = (month.length == 0) ? founded.month : month;
            let day = readline.question("Day of foundation (skip to not change): ");
            day = (day.length == 0) ? founded.day : day;
            dt = DateTime.fromObject({"day": day, "month": month, "year": year});
            if (!dt.isValid) {
                clear();
                console.log("Wrong date");
                readline.question("Press any key to continue...");
                continue;
            }
            let date = dt.toISODate();
            let employers = readline.question("Employers count: ");
            employers = (employers.length == 0) ? user.employers.toString() : employers;
            if (!isFinite(employers)) {
                clear();
                console.log("Wrong employers count");
                readline.question("Press any key to continue...");
                continue;
            }
            let active = readline.question("Is organisation currently active (0/1, skip to not change): ");
            active = (active.length == 0) ? user.isActive.toString() : active;
            if (!["1", "0"].includes(active)) {
                clear();
                console.log("Wrong number");
                readline.question("Press any key to continue...");
                continue;
            }
            console.log(OrgRepo.updateOrg(new Org(id, name, founder, date, employers, active)) ? "Updated successfully" : "Update failed");

        }
    } else if (input[0] === "delete") {
        if (entity === "user") {
            let id = readline.question("ID of user: ");
            if (!isFinite(id)) {
                console.log("ID must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            console.log(UserRepo.deleteUser(id) ? "Deleted successfully" : "Deletion failed");
        } else {
            let id = readline.question("ID of organisation: ");
            if (!isFinite(id)) {
                console.log("ID must be a number");
                readline.question("Press any key to continue...");
                continue;
            }
            console.log(OrgRepo.deleteOrg(id) ? "Deleted successfully" : "Deletion failed");
        }
    } else if (input[0] === "help") {
        console.log(help);
        break;
    } else if (input[0] === "exit") {
        console.log("Bye.");
        break;
    } else {
        console.log("Try again.");
    } readline.question("Press any key to continue...");
}
