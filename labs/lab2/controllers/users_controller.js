const usersRepo = require('../repositories/users_repository');
const UserRepo = new usersRepo("data/users.json");

const prop = Symbol('user');

module.exports = {
  GetUsers(req, res) {
    const page = Number(req.query.page);
    const per_page = Number(req.query.per_page);
    const users = UserRepo.GetUsers();
    if (page && per_page) {
      res.send(users.slice((page - 1) * per_page, page * per_page));
    } else {
      res.send(users);
    }
    res.end();
  },
  GetUserById(req, res) {
    res.send(req[prop]);
    res.end();
  },
  AddUser(req, res) {
    try {
      const id = UserRepo.AddUser(req.body);
      const user = UserRepo.GetUserById(id);
      res.send(user);
      res.status(201);
      res.end();
    } catch (e) {
      res.sendStatus(400);
    }
  },
  UpdateUser(req, res) {
    try {
      const user = UserRepo.GetUserById(req.body.id);
      if (!user) throw new RangeError("Not found");
      UserRepo.UpdateUser(req.body);
      res.send(UserRepo.GetUserById(req.body.id));
      res.end();
    } catch (e) {
      if (e instanceof RangeError) {
        res.sendStatus(404);
      } else {
        res.sendStatus(400);
      }
    }
  },
  DeleteUser(req, res) {
    UserRepo.DeleteUser(req[prop].id);
    res.send(req[prop]);
  },
  GetUserHandler(req, res, next) {
    const user = UserRepo.GetUserById(parseInt(req.params.id));
    if (user) {
      req[prop] = user;
      next();
    } else {
      res.sendStatus(404);
    }
  },
};
