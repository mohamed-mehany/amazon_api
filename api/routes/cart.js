const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let viewCartRequestCount = 1;
/* -- counters -- */

router.get('/', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    const receivingQueue = configs.apps.cart.viewCartRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.viewCartRoute.sendingQueues;
    const commands = configs.apps.cart.viewCartRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: viewCartRequestCount,
        user_id: req.headers.userId,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, viewCartRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + viewCartRequestCount++]);
            });
        }
    })
});

module.exports = router;