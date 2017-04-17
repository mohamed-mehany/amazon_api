const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getProductRatings", '{"id": 2, "data": "omar3"}')