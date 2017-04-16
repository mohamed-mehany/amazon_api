const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getProductReviews", '{"id": 1, "data": "omar3"}')