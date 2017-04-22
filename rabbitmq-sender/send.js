const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("addItemToCart", '{"id": 3, "data": "omar1"}')