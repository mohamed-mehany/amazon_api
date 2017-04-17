const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("registerVendor", '{"id": 2, "data": "omar3"}')