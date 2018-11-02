/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var amqp = require('amqp-connection-manager');
var Promise = require('bluebird');
const config = require('../config/config');
const messageQController = require('../controllers/message.queue.controller.js');
const util = require('util')

var QUEUE_NAME = config.InferencedImagesQ;
// var QUEUE_NAME = config.QToInferenceImages;
var connectionString = config.rabbitmqURL;


var RbConnection = function () {

};

RbConnection.getConnection = function () {
    if (typeof RbConnection.connection === 'undefined') {
        RbConnection.InitConnection();
    }
    return RbConnection.connection;
}

RbConnection.InitConnection = function (messageHandler) {

    console.log("********************:",messageHandler);

    RbConnection.messageHandler = messageHandler;

    RbConnection.connection = amqp.connect([connectionString], { json: true });

    RbConnection.connection.on('connect', function () {
        console.log('Connected!');
    });

    RbConnection.connection.on('disconnect', function (params) {
        console.log('Disconnected.', params.err.stack);
    });

    RbConnection.channelWrapper = RbConnection.connection.createChannel({
        setup: function (channel) {
            // `channel` here is a regular amqplib `ConfirmChannel`.
            return Promise.all([
                channel.assertQueue(QUEUE_NAME, { durable: true }),
                channel.prefetch(5),
                channel.consume(QUEUE_NAME, RbConnection.onMessage)
            ]);
        }
    });

    RbConnection.channelWrapper.waitForConnect().then(function () {
        console.log("Listening for messages in receiver");
    });

    RbConnection.onMessage = function (data) {
        var message = JSON.parse(data.content);
        console.log("receiver: got message", JSON.stringify(message));

        messageQController.handleReceivedMessage(data.content);
        RbConnection.channelWrapper.ack(data);
    };
}

RbConnection.closeConnection = function () {
    if (RbConnection.connection) {
        RbConnection.connection.close();
    }
}

module.exports = RbConnection;

