"use strict";
const OrdersController = require('../controllers').getOrdersController();
const express = require('express');
const router = express.Router();

router.post('/:userId/add', OrdersController.addOrder);

module.exports = router;
