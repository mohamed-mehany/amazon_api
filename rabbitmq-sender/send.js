const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("removeItemFromCart", '{"id": 2, "data": "omar1"}')