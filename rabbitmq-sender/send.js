const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("registerUser", '{"id": 2, "data": "omar1"}')