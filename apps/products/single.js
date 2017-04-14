const express = require('express')
const router = express.Router()
const rabbitmq = require("../../tools/rabbitmq")
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
    request.get(protocol + '://' + ip + 'product/' + slug + '/' + productsSingleID + productsSingleIDCount, function(err, response, body) {
        if (!err)
            res.send("your request could not be answered")
        else
            rabbitmq.receive(productsSingleID + productsSingleIDCount++, res)
    })

})
module.exports = router