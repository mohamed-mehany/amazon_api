const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("addItemToCart", '{"id": 1, "data": "omar1"}')