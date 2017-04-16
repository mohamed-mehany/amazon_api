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
        products: {
            channels: {
                index: 'productsIndex',
                single: 'singleProduct',
                reviews: {
                    productReviews: 'productReviews'
                }
            },
            perLoad: 20
        },

    }
}