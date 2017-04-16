module.exports = {
    wait: function(productsSingleId, productsSingleIdCount, numberOfRequests, callback) {
        while (true) {
            if (typeof rabbit[productsSingleId + productsSingleIdCount] !== 'undefined' && rabbit[productsSingleId + productsSingleIdCount].length == numberOfRequests)
                break
        }
        callback()
    }
}