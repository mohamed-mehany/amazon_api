const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let getProductRatingsRequestCount = 1;
/* -- counters -- */

router.get('/:productId', function(req, res) {
    const productId = req.params.productId;
    const receivingQueue = configs.apps.ratings.getRatingsRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.getRatingsRoute.sendingQueues;
    const commands = configs.apps.ratings.getRatingsRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: getProductRatingsRequestCount,
        product_id: productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            console.log(response);
            res.send(response);
        } else {
            consumer.wait(receivingQueue, getProductRatingsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + getProductRatingsRequestCount++]);
            });
        }
    })
})
module.exports = router;