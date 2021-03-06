const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let getProductReviewsRequestCount = 1;
let getProductRatingsRequestCount = 1;
let createProductRatingRequestCount = 1;
let getUserRatingsCount = 1;
/* -- counters -- */

router.get('productratings/:productId', function(req, res) {
    const productId = req.params.productId;
    const receivingQueue = configs.apps.ratings.getReviewsRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.getReviewsRoute.sendingQueues;
    const commands = configs.apps.ratings.getReviewsRoute.commands;
    const numberOfRequests = commands.length;
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
        return res.send({ error: 'you must be logged in' });
    if (typeof req.body.productId === 'undefined' || typeof req.body.value === 'undefined')
        return res.send({ error: 'you must provide a product id and a rating' });
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

router.get('/userratings', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send("you must be logged in");
    const receivingQueue = configs.apps.ratings.getUserRatingsRoute.receivingQueue;
    const sendingQueues = configs.apps.ratings.getUserRatingsRoute.sendingQueues;
    const commands = configs.apps.ratings.getUserRatingsRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: getUserRatingsCount,
        user_id: req.headers.userId,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, getUserRatingsCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + getUserRatingsCount++]);
            });
        }
    })
})

module.exports = router;