var amqp = require('amqplib/callback_api')
let configs = require("./configs")

const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    send: function(channelName, response) {
        amqp.connect(protocol + '://' + ip, function(err, conn) {
            if (err)
                console.log(err)
            else {
                conn.createChannel(function(err, ch) {
                    ch.assertQueue(channelName, { durable: false })
                        // Note: on Node 6 Buffer.from(msg) should be used
                    ch.sendToQueue(channelName, new Buffer(response))
                    console.log(" [x] Sent %s", response)
                })
            }
            setTimeout(function() {
                conn.close()
                process.exit(0)
            }, 500)
        })
    },
    receive: function(channelName, sendTo) {
        amqp.connect(protocol + '://' + ip, function(err, conn) {
            conn.createChannel(function(err, ch) {
                ch.assertQueue(channelName, { durable: false })
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", channelName)
                ch.consume(channelName, function(response) {
                    console.log(" [x] Received %s", response.content.toString())
                    conn.close()
                    sendTo.send(response.content.toString())
                }, { noAck: true })
            })
        })
    }
}