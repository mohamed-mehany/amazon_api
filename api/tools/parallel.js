module.exports = {
    parallelize: function(requests, callback) {
        async.parallel(requests,
            function(err, results) {
                console.log("mehany")
                if (err) {
                    console.log("mehany2")
                    return callback(err);
                }
                console.log("mehany3")
                return callback(false);
            }
        )
    },
}