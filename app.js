var express = require('express')
var app = express()
var products = require("./apps/products/index")
var product = require("./apps/products/single")
var home = require("./apps/home")

app.use('/', home)
app.use('/products', products)
app.use('/product', product)

global.rabbit = []
global.consumer = require("./tools/consumer.js")


app.listen(3444, function() {
    console.log('Example app listening on port 3444!')
})