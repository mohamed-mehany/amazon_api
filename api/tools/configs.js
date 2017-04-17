module.exports = {
    apiMQ: {
        protocol: 'amqp',
        ip: 'localhost',
    },
    apps: {
        protocol: 'http',
        ip: 'localhost:8080',
        ratings: {
            getRatingsRoute: {
                sendingQueues: ['Ratings'],
                receivingQueue: 'getProductAvgRatings',
                commands: ['GetTotalRating']
            },
            getReviewsRoute: {
                sendingQueues: ['Ratings'],
                receivingQueue: 'getProductRatings',
                commands: ['GetProductRatings']
            },
            createReviewRoute: {
                sendingQueues: ['Ratings'],
                receivingQueue: 'createRating',
                commands: ['CreateRating']
            }

        }

    }
}