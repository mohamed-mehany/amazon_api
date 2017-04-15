const express = require('express')
const router = express.Router()
const http = require("../../tools/http")
let configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip
const parallel = require("../../tools/parallel")

/* -- channels Names and coutners -- */
const productsSingleID = configs.apps.products.channels.single;
let productsSingleIDCount = 1;
/* -- channels Names and coutners -- */

const request = require('request')

router.get('/:slug', function(req, res) {
    const slug = req.params.slug
    const url = protocol + '://' + ip + '/product/' + slug + '/' + productsSingleID + productsSingleIDCount
    const channelName = productsSingleID + productsSingleIDCount
    parallel.parallelize(["product"], [
        function(callback) {
            http.get(url, channelName, callback)
        }
    ], res)
    productsSingleIDCount++
})
module.exports = router