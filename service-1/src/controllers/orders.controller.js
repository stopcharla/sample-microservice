const config = require('../config/config');
const sender = require('../messageQ/sender.js');
const messageQPublisher = new sender(config.QToInferenceImages);
const BaseController = require('./base.controller');
const Orders = require('../models').orders;
const HttpStatus = require('http-status');
require('../messageQ/receiver.js').getConnection();

class OrdersController extends BaseController {

    constructor() {
        super();
    }

    addOrder(req, res) {
        let body = req.body;
        let order = new Orders(body);
        var userId = req.params.userId;
        if (userId === 'undefined' || order.orderId === null || typeof (order.orderId) === 'undefined') {
            res.status(HttpStatus.BAD_REQUEST).send('insufficient parameters');
            return;
        }

        order.userId = userId;

        order.save().then((doc) => {
            messageQPublisher.sendMessage(doc);
            res.json(super.getSuccessResponse(doc));
        }).catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse(err));
        });
    }

    getOrder(req, res) {
        var orderId = req.params.orderId;
        Orders.find({ orderId: orderId }).exec().then((docs) => {
            if (docs.length > 0) {
                res.json(super.getSuccessResponse(docs));
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse("user not found"));
            }

        }).catch((err) => {
            console.log("error ocurred while fetching user from db");
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(super.getErrorResponse(err));
        });

    }
}

module.exports = OrdersController;



