const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getProductReviews", '{"count": 1, "content": "omar3"}')