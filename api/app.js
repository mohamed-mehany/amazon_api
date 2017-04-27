global.express = require('express');
const app = express();
const myParser = require("body-parser");
/*-- global variables --*/
global.rabbit = [];
global.amqp = require('amqplib/callback_api');
global.request = require('request');
global.async = require('async');
global.jwt = require('jsonwebtoken');
global.configs = require("./tools/configs");
global.rabbitmq = require("./tools/rabbitmq");
global.httpRequest = require("./tools/httpRequest");
global.parallel = require("./tools/parallel");
global.consumer = require("./tools/consumer.js");
global.multer = require('multer');
global.upload = multer({ dest: 'uploads/' });
/*-- global variables --*/
const ratings = require("./routes/ratings");
const user = require("./routes/user");
const vendor = require("./routes/vendor");
const cart = require("./routes/cart");
const imageupload = require("./routes/upload");

/*-- Middleware --*/
app.use('/', function(req, res, next) {
    if (req.headers.hasOwnProperty('token'))
        req.headers["userId"] = "22";
    next()
});
app.use(myParser.urlencoded({ extended: true }));
/*-- Middleware --*/

/*-- Routes --*/
app.use('/ratings', ratings);
app.use('/user', user);
app.use('/vendor', vendor);
app.use('/cart', cart);
app.use('/upload', imageupload);
/*-- Routes --*/

app.listen(3444, function() {
    console.log('Example app listening on port 3444!');
});