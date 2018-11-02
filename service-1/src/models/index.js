//Require all mongoose models here
var users = require('./users.model');
var orders = require('./orders.model');

module.exports = {
    users : users,
    orders : orders
};
