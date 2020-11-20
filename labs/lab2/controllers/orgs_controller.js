const orgsRepo = require('../repositories/orgs_repository');
const OrgRepo = new orgsRepo("data/orgs.json");

const prop = Symbol('org');

module.exports = {
  GetOrgs(req, res) {
    const page = Number(req.query.page);
    const per_page = Number(req.query.per_page);
    const orgs = OrgRepo.GetOrgs();
    if (page && per_page) {
      res.send(orgs.slice((page - 1) * per_page, page * per_page));
    } else {
      res.send(orgs);
    }
    res.end();
  },
  GetOrgById(req, res) {
    res.send(req[prop]);
    res.end();
  },
  AddOrg(req, res) {
    try {
      const id = OrgRepo.AddOrg(req.body);
      const org = OrgRepo.GetOrgById(id);
      res.send(org);
      res.status(201);
      res.end();
    } catch (e) {
      res.sendStatus(400);
    }
  },
  UpdateOrg(req, res) {
    try {
      const org = OrgRepo.GetOrgById(req.body.id);
      if (!org) throw new RangeError("Not found");
      OrgRepo.UpdateOrg(req.body);
      res.send(OrgRepo.GetOrgById(req.body.id));
      res.end();
    } catch (e) {
      if (e instanceof RangeError) {
        res.sendStatus(404);
      } else {
        res.sendStatus(400);
      }
    }
  },
  DeleteOrg(req, res) {
    OrgRepo.DeleteOrg(req[prop].id);
    res.send(req[prop]);
  },
  GetOrgHandler(req, res, next) {
    const org = OrgRepo.GetOrgById(parseInt(req.params.id));
    if (org) {
      req[prop] = org;
      next();
    } else {
      res.sendStatus(404);
    }
  }
};
