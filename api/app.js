global.express = require('express');
const app = express();
const myParser = require("body-parser");

/*-- global variables --*/
global.rabbit = [];
global.amqp = require('amqplib/callback_api');
global.request = require('request');
global.async = require('async');
global.configs = require("./tools/configs");
global.rabbitmq = require("./tools/rabbitmq");
global.httpRequest = require("./tools/httpRequest");
global.parallel = require("./tools/parallel");
global.consumer = require("./tools/consumer.js");
/*-- global variables --*/
const ratings = require("./routes/ratings");
const user = require("./routes/user");

/*-- Middleware --*/
app.use('/', function(req, res, next) {
    if (req.headers.hasOwnProperty('token'))
        req.headers["userId"] = "22";
    next()
});
app.use(myParser.urlencoded({ extended: true }));
/*-- Middleware --*/
app.use('/ratings', ratings);
app.use('/user', user);


app.listen(3444, function() {
    console.log('Example app listening on port 3444!');
});