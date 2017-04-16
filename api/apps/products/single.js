const protocol = configs.apps.protocol
const ip = configs.apps.ip

/* -- channels Names and coutners -- */
const productsSingleId = configs.apps.products.channels.single;
let productsSingleIdCount = 1;
const productReviewsId = configs.apps.products.channels.reviews.productReviews;
let productReviewsIdCount = 1;
/* -- channels Names and coutners -- */

const request = require('request')

router.get('/:id/reviews', function(req, res) {
    const id = req.params.id
    const url = protocol + '://' + ip + '/product/' + id + '/' + productReviewsId + '/' + productReviewsIdCount
    const queueName = productReviewsId
    const numberOfRequests = 1
    parallel.parallelize([
        function(callback) {
            httpRequest.post(url, { key: 'value' }, queueName, callback)
        }
    ], function(response) {
        if (response)
            res.send("error")
        else {
            consumer.wait(productReviewsId, productReviewsIdCount, numberOfRequests, function() {
                res.send(rabbit[productReviewsId + productReviewsIdCount++])
            })

        }

    })
})
module.exports = router