const express = require('express')
const router = express.Router()
const httpRequest = require("../../tools/httpRequest")
let configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip
const parallel = require("../../tools/parallel")

/* -- channels Names and coutners -- */
const productsSingleId = configs.apps.products.channels.single;
let productsSingleIdCount = 1;
/* -- channels Names and coutners -- */

const request = require('request')

router.get('/:slug', function(req, res) {
    const slug = req.params.slug
    const url = protocol + '://' + ip + '/product/' + slug + '/' + productsSingleId + productsSingleIdCount
    const channelName = productsSingleId + productsSingleIdCount
    parallel.parallelize(["product"], [
        function(callback) {
            httpRequest.get(url, channelName, callback)
        }
    ], function(response) {
        res.send(response)
    })
    productsSingleIdCount++
})
module.exports = router