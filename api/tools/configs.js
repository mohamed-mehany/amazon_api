module.exports = {
    apiMQ: {
        protocol: 'amqp',
        ip: 'user:password@192.168.43.193:5672',
    },
    mediaServer: {
        uploadRoute: "http://localhost:5000/products",
        getRoute: "http://localhost:5000/"
    },
    apps: {
        protocol: 'http',
        ip: '192.168.43.193:8080',
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
                commands: ['viewUserProfile']
            },
            editProfileRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'editProfile',
                commands: ['editProfileInfo']
            },
            registerRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'registerUser',
                commands: ['createUser']
            },
            tokenRoute: {
                sendingQueues: ['User'],
                receivingQueue: 'userToken',
                commands: ['GetUserByToken']
            }
        },
        vendors: {
            registerRoute: {
                sendingQueues: ['Vendor'],
                receivingQueue: 'registerVendor',
                commands: ['createVendor']
            },
            addProductRoute: {
                sendingQueues: ['Vendor'],
                receivingQueue: 'addProduct',
                commands: ['AddProduct']
            },
            deleteProductRoute: {
                sendingQueues: ['Vendor'],
                receivingQueue: 'deleteProduct',
                commands: ['DeleteProduct']
            }
        },
        cart: {
            viewCartRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'viewCart',
                commands: ['ViewCart']
            },
            addItemToCartRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'addItemToCart',
                commands: ['AddItemToCart']
            },
            changeItemQuantityRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'changeItemQuantity',
                commands: ['ChangeItemQuantity']
            },
            proceedToPaymentRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'proceedToPayment',
                commands: ['ProceedToPayment']
            },
            removeItemFromCartRoute: {
                sendingQueues: ['Cart'],
                receivingQueue: 'removeItemFromCart',
                commands: ['RemoveItemFromCart']
            }
        },
        products: {
            indexProductsRoute: {
                sendingQueues: ['Product'],
                receivingQueue: 'indexProducts',
                commands: ['IndexProducts']
            },
            sortProductsRoute: {
                sendingQueues: ['Product'],
                receivingQueue: 'sortProducts',
                commands: ['SortProducts']
            },
            viewProductRoute: {
                sendingQueues: ['Product'],
                receivingQueue: 'viewProduct',
                commands: ['ViewProduct']
            }
        }

    }
}