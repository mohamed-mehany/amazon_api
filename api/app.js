const express = require('express')
const app = express()

/*-- global variables --*/
global.rabbit = []
global.amqp = require('amqplib/callback_api')
global.request = require('request')
global.async = require('async');
global.configs = require("./tools/configs")
global.rabbitmq = require("./tools/rabbitmq")
global.httpRequest = require("./tools/httpRequest")
global.parallel = require("./tools/parallel")
global.consumer = require("./tools/consumer.js")
global.router = express.Router()
    /*-- global variables --*/
const reviews = require("./routes/reviews")
app.use('/reviews', reviews)

app.listen(3444, function() {
    console.log('Example app listening on port 3444!')
})