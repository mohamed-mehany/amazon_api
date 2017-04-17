const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("createRating", '{"id": 1, "data": "omar3"}')