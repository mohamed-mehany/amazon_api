const protocol = 'amqp'
const ip = 'localhost'
module.exports = {
    apiMQ: {
        protocol: 'amqp',
        ip: 'localhost',
    },
    apps: {
        protocol: 'http',
        ip: 'localhost:8080',
        reviews: {
            getReviewsRoute: {
                sendingQueues: ['Ratings'],
                receivingQueue: 'getProductReviews',
                commands: ['GetProductRatings']
            }

        },

    }
}
