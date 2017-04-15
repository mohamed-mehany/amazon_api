const amqp = require('amqplib/callback_api')
let configs = require("./configs")
const request = require('request')
const async = require('async');

module.exports = {
    parallelize: function(responseNames, requests, callback) {
        async.parallel(requests,
            function(err, results) {
                if (err) {
                    return callback(err);
                }
                responses = {}
                for (let i = 0; i < results.length; i++)
                    responses[responseNames[i]] = results[i]
                return callback(responses);
            }
        )
    },
}