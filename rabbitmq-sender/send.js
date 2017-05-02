const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("indexProducts", '{"id": 1, "data": "omar1"}')