const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("singleProduct", '{"id": 1, "content": "omar2"}')