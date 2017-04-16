const url = configs.apps.protocol + '://' + configs.apps.ip + '/';
/* -- counters -- */
let getProductReviewsRequestCount = 1;
/* -- counters -- */

router.get('/:productId', function(req, res) {
    const productId = req.params.productId
    const receivingQueue = configs.apps.reviews.getReviewsRoute.receivingQueue
    const sendingQueues = configs.apps.reviews.getReviewsRoute.sendingQueues
    const commands = configs.apps.reviews.getReviewsRoute.commands
    const numberOfRequests = commands.length
    const data = { product_id: productId }
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data)
    parallel.parallelize(requests, function(response) {
        if (response)
            res.send("error")
        else {
            consumer.wait(receivingQueue, getProductReviewsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + getProductReviewsRequestCount++])
            })

        }

    })
})
module.exports = router