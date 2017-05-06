const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("addProduct", '{"id": 1, "data": "omar1"}')