const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("getProductReviews", '{"id": 1, "content": "omar3"}')