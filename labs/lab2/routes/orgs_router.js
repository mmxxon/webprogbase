const express = require('express');
const router = express.Router();

const OrgsController = require('../controllers/orgs_controller');

/**
 * Returns orgs
 * @route GET /api/orgs/
 * @group Orgs - org operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Org[]} Org - a page with orgs
 */
router.get('/', OrgsController.GetOrgs);
/**
 * Returns org by id
 * @route GET /api/orgs/{id}
 * @group Orgs - org operations
 * @param {integer} id.path.required - id of the Org - eq: 1
 * @returns {Org.model} 200 - Org object
 * @returns {Error} 404 - Org not found
 */
router.get('/:id', OrgsController.GetOrgHandler, OrgsController.GetOrgById);
/**
 * Uploads org to repository
 * @route POST /api/orgs/
 * @group Orgs - org operations
 * @param {Org.model} id.body.required - new org object
 * @returns {Org.model} 201 - added org object
 */
router.post('/', OrgsController.AddOrg);
/**
 * Updates org
 * @route PUT /api/orgs/
 * @group Orgs - org operations
 * @param {Org.model} id.body.required - new org object
 * @returns {Org.model} 200 - changed org object
 */
router.put('/', OrgsController.UpdateOrg);
/**
 * Deletes org
 * @route DELETE /api/orgs/{id}
 * @group Orgs - org operations
 * @param {integer} id.path.required - id of the Org - eg: 1
 * @returns {Org.model} 200 - deleted org object
 * @returns {Error} 404 - Org not found
 */
router.delete('/:id', OrgsController.GetOrgHandler, OrgsController.DeleteOrg);

module.exports = router;
