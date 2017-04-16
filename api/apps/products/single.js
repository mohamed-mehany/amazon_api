const protocol = configs.apps.protocol
const ip = configs.apps.ip

/* -- channels Names and coutners -- */
const productsSingleId = configs.apps.products.channels.single;
let productsSingleIdCount = 1;
/* -- channels Names and coutners -- */

const request = require('request')

router.get('/:slug', function(req, res) {
    const slug = req.params.slug
    const url = protocol + '://' + ip + '/product/' + slug + '/' + productsSingleId + '/' + productsSingleIdCount
    const queueName = productsSingleId
    const numberOfRequests = 2
    parallel.parallelize([
        function(callback) {
            httpRequest.get(url, queueName, callback)
        },
        function(callback) {
            httpRequest.get(url, queueName, callback)
        }
    ], function(response) {
        if (response)
            res.send("error")
        else {
            consumer.wait(productsSingleId, productsSingleIdCount, numberOfRequests, function() {
                res.send(rabbit[productsSingleId + productsSingleIdCount++])
            })

        }

    })
})
module.exports = router