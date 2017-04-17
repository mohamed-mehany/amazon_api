const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let getProductReviewsRequestCount = 1;
let getProductRatingsRequestCount = 1;
let createProductRatingRequestCount = 1;
/* -- counters -- */

router.get('/:productId', function(req, res) {
    const productId = req.params.productId;
    const receivingQueue = configs.apps.ratings.getReviewsRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.getReviewsRoute.sendingQueues;
    const commands = configs.apps.ratings.getReviewsRoute.commands;
    const numberOfRequests = commands.length;
    console.log(getProductReviewsRequestCount)
    const data = {
        requestId: getProductReviewsRequestCount,
        product_id: productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, getProductReviewsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + getProductReviewsRequestCount++]);
            });
        }
    });
})

router.get('/avgRating/:productId', function(req, res) {
    const productId = req.params.productId;
    const receivingQueue = configs.apps.ratings.getRatingsRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.getRatingsRoute.sendingQueues;
    const commands = configs.apps.ratings.getRatingsRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: getProductRatingsRequestCount,
        product_id: productId,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, getProductRatingsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + getProductRatingsRequestCount++]);
            });
        }
    })
});

router.post('/create', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send("you must be logged in");
    const receivingQueue = configs.apps.ratings.createReviewRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.createReviewRoute.sendingQueues;
    const commands = configs.apps.ratings.createReviewRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: createProductRatingRequestCount,
        product_id: req.body.productId,
        user_id: req.headers.userId,
        review: req.body.review,
        value: req.body.value
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, createProductRatingRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + createProductRatingRequestCount++]);
            });
        }
    })
})
module.exports = router;