const protocol = configs.apiMQ.protocol
const ip = configs.apiMQ.ip
module.exports = {
    get: function(url, queueName, callback) {
        request.get(url, function(err, response, body) {

            if (err)
                callback(err)
            else {
                rabbitmq.receive(queueName, callback)
            }
        })
    },
    post: function(url, data, queueName, callback) {
        var options = {
            method: "POST",
            json: JSON.stringify(data)
        };
        request(url, options, function(err, response, body) {
            if (err)
                callback(err)
            else {
                rabbitmq.receive(queueName, callback)
            }
        });
    }
}