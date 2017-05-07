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
global.fs = require('fs');
/*-- global variables --*/
const ratings = require("./routes/ratings");
const user = require("./routes/user");
const vendor = require("./routes/vendor");
const cart = require("./routes/cart");
const product = require("./routes/product");
const imageupload = require("./routes/upload");
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
let tokenRequestCount = 1;
/*-- Middleware --*/
app.use('/', function(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        const receivingQueue = configs.apps.users.tokenRoute.receivingQueue;
        const sendingQueues = configs.apps.users.tokenRoute.sendingQueues;
        const commands = configs.apps.users.tokenRoute.commands;
        const numberOfRequests = commands.length;
        const data = {
            token: req.headers.token
        };
        const requests = consumer.createRequests(url, receivingQueue, sendingQueues, tokenRequestCount, commands, data);
        parallel.parallelize(requests, function(response) {
            if (response) {
                res.send(response);
            } else {
                consumer.wait(receivingQueue, tokenRequestCount, numberOfRequests, function() {
                    req.headers["userId"] = rabbit[receivingQueue + tokenRequestCount++][0][0].id;
                    console.log(req.headers["userId"]);
                    next();
                });
            }
        })
    } else
        next();
});
app.use(myParser.urlencoded({ extended: true }));
/*-- Middleware --*/

/*-- Routes --*/
app.use('/ratings', ratings);
app.use('/user', user);
app.use('/vendor', vendor);
app.use('/cart', cart);
app.use('/product', product);
app.use('/upload', imageupload);
/*-- Routes --*/

app.listen(3444, function() {
    console.log('Example app listening on port 3444!');
});