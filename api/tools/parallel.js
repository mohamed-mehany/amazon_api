module.exports = {
    parallelize: function(requests, callback) {
        async.parallel(requests,
            function(err, results) {
                if (err) {
                    return callback(err);
                }
                return callback(false);
            }
        )
    },
}