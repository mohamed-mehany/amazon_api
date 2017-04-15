const express = require('express')
const router = express.Router()
const http = require("../../tools/http")
let configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip
const parallel = require("../../tools/parallel")


/* -- channels Names and coutners -- */
const productsIndexID = configs.apps.products.channels.index;
let productsIndexIDCount = 1;
const productsPerLoad = configs.apps.products.perLoad;
/* -- channels Names and coutners -- */

const request = require('request')
router.get('/:page', function(req, res) {
    const page = req.params.page
    const url = protocol + '://' + ip + '/products/' + page * productsPerLoad + "/" + productsIndexID + productsIndexIDCount
    const channelName = productsIndexID + productsIndexIDCount
    parallel.parallelize(["products"], [
        function(callback) {
            http.get(url, channelName, callback)
        }
    ], res)
    productsIndexIDCount++
})

router.get('/', function(req, res) {
    const url = protocol + '://' + ip + '/products/' + 1 * productsPerLoad + "/" + productsIndexID + productsIndexIDCount
    const channelName = productsIndexID + productsIndexIDCount
    parallel.parallelize(["products"], [
        function(callback) {
            http.get(url, channelName, callback)
        }
    ], res)
    productsIndexIDCount++
})

module.exports = router