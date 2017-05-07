const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("removeItemFromCart", '{"id": 1, "data": "omar1"}')