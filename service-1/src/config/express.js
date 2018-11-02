"use strict";

const config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    orderRoute = require('../routes/order.routes.js'),
    userRoute = require('../routes/user.routes');


var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/** GET /health-check - Check service health */
app.get('/health-check', (req, res) => {
    logger.info("health check");
    res.send('OK')
});

app.use('/order/',orderRoute);
app.use('/user/',userRoute);

module.exports = app;
