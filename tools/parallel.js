const amqp = require('amqplib/callback_api')
const configs = require("./configs")
const request = require('request')
const async = require('async');

module.exports = {
    parallelize: function(requests, callback) {
        async.parallel(requests,
            function(err, results) {
                if (err) {
                    return callback(err);
                }
                return callback(false);
            }
        )
    },
}