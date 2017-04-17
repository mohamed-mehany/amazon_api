const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getProductRatings", '{"id": 1, "data": "omar3"}')