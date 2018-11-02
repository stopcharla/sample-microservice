/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var amqp = require('amqp-connection-manager');
const config = require("../config/config");


var rabbitmqSender = function(queueName){
    this.queueName = queueName || config.QToInferenceImages;
    this.connectionString = config.rabbitmqURL;
    this.createConnection();
}

rabbitmqSender.prototype.createConnection = function(){
    var that = this
    this.connection= amqp.connect([this.connectionString], {json: true});
    this.connection.on('connect', function() {
        console.log('Connected to rabbitmq in sender!');
        that.channelWrapper = that.connection.createChannel({
            json: true,
            setup: function(channel) {
                // `channel` here is a regular amqplib `ConfirmChannel`.
                return channel.assertQueue(that.queueName, {durable: true});
            }
        });
    });
    this.connection.on('disconnect', function(params) {
        console.log('Disconnected.', params.err.stack);
    });
}

rabbitmqSender.prototype.closeConnection = function(){
    this.channelWrapper.close();
    this.connection.close();
}

rabbitmqSender.prototype.sendMessage = function(msg) {
    var that=this;
    console.log('trying to send message to rabbitmq')
    this.channelWrapper.sendToQueue(this.queueName, msg)
        .then(function() {
            console.log("Message sent to ",that.queueName);
        }).catch(function(err) {
        this.channelWrapper.close();
        this.connection.close();
        console.log("Message was rejected:", err.stack);
        return;
    });
};

module.exports = rabbitmqSender;
