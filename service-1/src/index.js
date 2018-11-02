const config = require('./config/config');
var mongoose = require('./config/mongoose');
var db = mongoose();
module.exports = require("./config/express");


