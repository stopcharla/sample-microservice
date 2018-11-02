"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./src/config/config');

var app = require('./src');
console.log(app);
    // passport = passport();

// Setting up root directory from where app got started
app.locals.rootPath = __dirname;

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
