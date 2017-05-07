const protocol = 'amqp'
const ip = 'localhost'
module.exports = {
    apiMQ: {
        protocol: 'amqp',
        ip: 'user:password@192.168.1.27:5672',
    },
    apps: {
        protocol: 'http',
        ip: 'localhost',
        products: {
            channels: {
                index: 'productsIndex',
                single: 'singleProduct'
            },
            perLoad: 20
        },

    }
}