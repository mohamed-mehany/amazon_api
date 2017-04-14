const express = require('express')
const router = express.Router()
const rabbitmq = require("../../tools/rabbitmq")
let configs = require("../../tools/configs")
const protocol = configs.apps.protocol
const ip = configs.apps.ip

/* -- channels Names and coutners -- */
const productsIndexID = configs.apps.products.channels.index;
let productsIndexIDCount = 1;
const productsPerLoad = configs.apps.products.perLoad;
/* -- channels Names and coutners -- */

const request = require('request')
router.get('/:page', function(req, res) {
    const page = req.params.page
    request.get(protocol + '://' + ip + 'products/' + page * productsPerLoad + "/" + productsIndexID + productsIndexIDCount, function(err, response, body) {
        if (!err)
            res.send("your request could not be answered")
        else
            rabbitmq.receive(productsIndexID + productsIndexIDCount++, res)
    })

})

router.get('/', function(req, res) {
    request.get(protocol + '://' + ip + 'products/' + 1 * productsPerLoad + "/" + productsIndexID + productsIndexIDCount, function(err, response, body) {
        if (!err)
            res.send("your request could not be answered")
        else
            rabbitmq.receive(productsIndexID + productsIndexIDCount++, res)
    })

})

module.exports = router