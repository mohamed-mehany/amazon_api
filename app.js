const express = require('express')
const app = express()
const products = require("./apps/products/index")
const product = require("./apps/products/single")

app.use('/products', products)
app.use('/product', product)

global.rabbit = []
global.consumer = require("./tools/consumer.js")


app.listen(3444, function() {
    console.log('Example app listening on port 3444!')
})