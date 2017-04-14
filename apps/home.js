var express = require('express')
var express = require('express')
var router = express.Router()
var rabbitmq = require("../tools/rabbitmq")
var request = require('request')
router.get('/', function(req, res) {
    rabbitmq.receive("hello", res)
})
module.exports = router