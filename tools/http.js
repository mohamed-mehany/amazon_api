const amqp = require('amqplib/callback_api')
let configs = require("./configs")
const request = require('request')
const rabbitmq = require("./rabbitmq")

const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    get: function(url, channelName, routeResponse) {
        request.get(url, function(err, response, body) {
            if (err)
                routeResponse.send("your request could not be answered")
            else
                rabbitmq.receive(channelName, routeResponse)
        })
    },
}