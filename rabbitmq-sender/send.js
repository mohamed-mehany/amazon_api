const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("login", '{"id": 1, "data": "omar3"}')