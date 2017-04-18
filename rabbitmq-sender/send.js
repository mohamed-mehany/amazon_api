const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("viewCart", '{"id": 1, "data": "omar1"}')