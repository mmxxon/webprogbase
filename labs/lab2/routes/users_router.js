const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users_controller');

/**
 * Returns users
 * @route GET /api/users/
 * @group Users - user operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {User[]} User - a page with users
 */
router.get('/', UsersController.GetUsers);
/**
 * Returns user by id
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User - eq: 1
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 */
router.get('/:id', UsersController.GetUserHandler, UsersController.GetUserById);
/**
 * Uploads user to repository
 * @route POST /api/users/
 * @group Users - user operations
 * @param {User.model} id.body.required - new User object
 * @returns {User.model} 201 - added User object
 */
router.post('/', UsersController.AddUser);
/**
 * Updates user
 * @route PUT /api/users/
 * @group Users - user operations
 * @param {User.model} id.body.required - new User object
 * @returns {User.model} 200 - changed User object
 */
router.put('/', UsersController.UpdateUser);
/**
 * Deletes user
 * @route DELETE /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User - eg: 1
 * @returns {User.model} 200 - deleted User object
 * @returns {Error} 404 - User not found
 */
router.delete('/:id', UsersController.GetUserHandler, UsersController.DeleteUser);

module.exports = router;
