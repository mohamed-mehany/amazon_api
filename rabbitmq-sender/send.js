const rabbitmq = require("./tools/rabbitmq")
rabbitmq.receive("registerUser", function(res) { console.log(res) })