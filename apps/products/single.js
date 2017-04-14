const express = require('express')
const router = express.Router()
const http = require("../../tools/http")
let configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip

/* -- channels Names and coutners -- */
const productsSingleID = configs.apps.products.channels.single;
let productsSingleIDCount = 1;
/* -- channels Names and coutners -- */

const request = require('request')

router.get('/:slug', function(req, res) {
    const slug = req.params.slug
    const url = protocol + '://' + ip + '/product/' + slug + '/' + productsSingleID + productsSingleIDCount
    const channelName = productsSingleID + productsSingleIDCount
    http.get(url, channelName, res)
    productsSingleIDCount++
})
module.exports = router