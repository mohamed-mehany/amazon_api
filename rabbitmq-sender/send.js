const rabbitmq = require("./tools/rabbitmq")
rabbitmq.send("editProfile", '{"id": 1, "data": "omar3"}')