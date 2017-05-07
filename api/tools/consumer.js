module.exports = {
    wait: function(productsSingleId, productsSingleIdCount, numberOfRequests, callback) {
        while (true) {
            if (typeof rabbit[productsSingleId + productsSingleIdCount] !== 'undefined' && rabbit[productsSingleId + productsSingleIdCount].length == numberOfRequests) {
                console.log("asd")
                break;
            }
        }
        callback();
    },
    createRequests: function(url, receivingQueue, sendingQueues, requestId, commands, data) {
        requests = [];

        let i = 0;
        commands.forEach(function(command) {
            requests.push(
                function(callback) {
                    httpRequest.post(url + '/' + sendingQueues[i++], { requestId: parseInt(requestId), sessionID: "123123", receivingQueue: receivingQueue, command: command, data: data }, receivingQueue, callback);
                }
            );
        });
        return requests;
    }
}