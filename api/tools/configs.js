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
            },
            getUserRatingsRoute: {
                sendingQueues: ['Ratings'],
                receivingQueue: 'getUserRatings',
                commands: ['GetUserRatings']
            }
        },
        users: {
            logInRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'login',
                commands: ['Login']
            },
            viewProfileRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'viewProfile',
                commands: ['ViewUserProfile']
            },
            editProfileRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'editProfile',
                commands: ['EditProfileInfo']
            },
            registerRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'registerUser',
                commands: ['CreateUser']
            }
        },
        vendors: {
            registerRoute: {
                sendingQueues: ['Vendor'],
                receivingQueue: 'registerVendor',
                commands: ['CreateVendor']
            }
        },
        cart: {
            viewCartRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'viewCart',
                commands: ['ViewCart']
            }
        }

    }
}