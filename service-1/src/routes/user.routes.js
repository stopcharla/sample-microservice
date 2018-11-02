"use strict";
const UsersController = require('../controllers').getUsersController();
const express = require('express');
const router = express.Router();

router.get('/:userId', UsersController.getUser);
router.post('/add', UsersController.addUser);

module.exports = router;
