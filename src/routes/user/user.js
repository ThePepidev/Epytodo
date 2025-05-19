const express = require('express');
const router = express.Router();
const userQuery = require('./user.query');
const authenticateToken = require('../../middleware/auth');

router.use(authenticateToken);
router.get('/:id', userQuery.getUserById);

module.exports = router;
