const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("changeItemQuantity", '{"id": 1, "data": "omar1"}')