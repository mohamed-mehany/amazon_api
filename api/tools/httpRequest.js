const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    get: function(url, queueName, callback) {
        request.get(url, function(err, response, body) {

            if (!err)
                callback(err)
            else {
                rabbitmq.receive(queueName, callback)
            }
        })
    },
}