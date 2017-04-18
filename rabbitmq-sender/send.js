const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("registerUser", '{"id": 1, "data": "omar1"}')