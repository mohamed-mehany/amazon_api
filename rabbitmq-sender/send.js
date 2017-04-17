const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("viewProfile", '{"id": 1, "data": "omar3"}')