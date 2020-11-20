const express = require('express');
const router = express.Router();
const OrgsRouter = require('./orgs_router');
const UsersRouter = require('./users_router');
const MediaRouter = require('./media_router');

router.use('/orgs', OrgsRouter);
router.use('/users', UsersRouter);
router.use('/media', MediaRouter);

module.exports = router;
