const amqp = require('amqplib/callback_api')
const configs = require("./configs")
const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    send: function(queueName, response) {
        amqp.connect(protocol + '://' + ip, function(err, conn) {
            if (err)
                console.log(err)
            else {
                conn.createChannel(function(err, ch) {
                    ch.assertQueue(queueName, { durable: false })
                        // Note: on Node 6 Buffer.from(msg) should be used
                    ch.sendToQueue(queueName, new Buffer(response))
                    console.log(" [x] Sent %s", response)
                })
            }
            setTimeout(function() {
                conn.close()
                process.exit(0)
            }, 500)
        })
    },
    receive: function(queueName, callback) {
        amqp.connect(protocol + '://' + ip, function(err, conn) {
            if (err)
                return callback(err)
            conn.createChannel(function(err, ch) {
                if (err) {
                    return callback(err)
                } else {
                    ch.assertQueue(queueName, { durable: false })
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName)
                    ch.consume(queueName, function(response) {
                        responseJson = JSON.parse(response.content)
                        if (typeof rabbit[queueName + responseJson.id] === 'undefined') {
                            rabbit[queueName + responseJson.id] = []
                        }
                        rabbit[queueName + responseJson.count].push(responseJson.content.toString())
                        conn.close()
                        callback(false)
                    }, { noAck: true })
                }

            })
        })
    }
}