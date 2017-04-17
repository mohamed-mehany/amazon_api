global.express = require('express');
const app = express();

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
const reviews = require("./routes/reviews");
const ratings = require("./routes/ratings");

app.use('/reviews', reviews);
app.use('/ratings', ratings);

app.listen(3444, function() {
    console.log('Example app listening on port 3444!');
});