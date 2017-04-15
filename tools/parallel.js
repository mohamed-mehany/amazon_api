const amqp = require('amqplib/callback_api')
let configs = require("./configs")
const request = require('request')
const rabbitmq = require("./rabbitmq")
const async = require('async');


const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    parallelize: function(responseNames, requests, res) {
        async.parallel(requests,
            function(err, results) {
                if (err) {
                    res.status(500).send("something went wrong");
                    return;
                }
                responses = {}
                for (let i = 0; i < results.length; i++)
                    responses[responseNames[i]] = results[i]
                res.send(responses);
            }
        )
    },
}