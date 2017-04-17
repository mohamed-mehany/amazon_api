module.exports = {
    wait: function(productsSingleId, productsSingleIdCount, numberOfRequests, callback) {
        while (true) {
            if (typeof rabbit[productsSingleId + productsSingleIdCount] !== 'undefined' && rabbit[productsSingleId + productsSingleIdCount].length == numberOfRequests)
                break;
        }
        callback();
    },
    createRequests: function(url, receivingQueue, sendingQueues, commands, data) {
        requests = [];
        let i = 0;
        commands.forEach(function(command) {
            requests.push(
                function(callback) {
                    httpRequest.post(url + '/' + sendingQueues[i++], { receivingQueue: receivingQueue, command: command, data: data }, receivingQueue, callback);
                }
            );
        });
        return requests;
    }
}