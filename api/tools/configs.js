const protocol = 'amqp'
const ip = 'localhost'
module.exports = {
    apiMQ: {
        protocol: 'amqp',
        ip: 'localhost',
    },
    apps: {
        protocol: 'http',
        ip: 'localhost',
        reviews: {
            getReviewsRoute: {
                sendingQueues: ['productReviews'],
                receivingQueue: 'getProductReviews',
                commands: ['getProductRatings']
            }

        },

    }
}