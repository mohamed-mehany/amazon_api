const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("addItemToCart", '{"id": 2, "data": "omar1"}')