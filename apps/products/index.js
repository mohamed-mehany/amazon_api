const express = require('express')
const router = express.Router()
const httpRequest = require("../../tools/httpRequest")
const configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip
const parallel = require("../../tools/parallel")


/* -- channels Names and coutners -- */
const productsIndexId = configs.apps.products.channels.index;
let productsIndexIdCount = 1;
const productsPerLoad = configs.apps.products.perLoad;
/* -- channels Names and coutners -- */

const request = require('request')
router.get('/:page', function(req, res) {
    const page = req.params.page
    const url = protocol + '://' + ip + '/products/' + page * productsPerLoad + "/" + productsIndexId + productsIndexIdCount
    const channelName = productsIndexId + productsIndexIdCount
    parallel.parallelize(["products"], [
        function(callback) {
            httpRequest.get(url, channelName, callback)
        }
    ], res)
    productsIndexIdCount++
})

router.get('/', function(req, res) {
    const url = protocol + '://' + ip + '/products/' + 1 * productsPerLoad + "/" + productsIndexId + productsIndexIdCount
    const channelName = productsIndexId + productsIndexIdCount
    parallel.parallelize(["products"], [
        function(callback) {
            httpRequest.get(url, channelName, callback)
        }
    ], res)
    productsIndexIdCount++
})

module.exports = router