const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("changeItemQuantity", '{"id": 2, "data": "omar1"}')