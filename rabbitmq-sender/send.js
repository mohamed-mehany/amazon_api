const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("productReviews", '{"id": 1, "content": "omar2"}')