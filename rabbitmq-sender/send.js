const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getUserRatings", '{"id": 3, "data": "omar3"}')