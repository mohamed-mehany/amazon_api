const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let viewCartRequestCount = 1;
let addToCartRequestCount = 1;
let changeItemQuantityRequestCount = 1;
let proceedToPaymentRouteRequestCount = 1;
let removeItemFromCartRouteRequestCount = 1;
/* -- counters -- */

router.get('/', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    const receivingQueue = configs.apps.cart.viewCartRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.viewCartRoute.sendingQueues;
    const commands = configs.apps.cart.viewCartRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: viewCartRequestCount,
        userID: req.headers.userId,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, viewCartRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + viewCartRequestCount++]);
            });
        }
    })
});

router.get('/add/:productId', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.params.productId === 'undefined')
        return res.send({ error: 'you must provide a product ID' });
    const receivingQueue = configs.apps.cart.addItemToCartRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.addItemToCartRoute.sendingQueues;
    const commands = configs.apps.cart.addItemToCartRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: addToCartRequestCount,
        userID: req.headers.userId,
        productID: req.params.productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, addToCartRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + addToCartRequestCount++]);
            });
        }
    })
});


router.get('/edit/:productId', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.params.productId === 'undefined')
        return res.send({ error: 'you must provide a product ID' });
    const receivingQueue = configs.apps.cart.changeItemQuantityRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.changeItemQuantityRoute.sendingQueues;
    const commands = configs.apps.cart.changeItemQuantityRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: changeItemQuantityRequestCount,
        userID: req.headers.userId,
        productID: req.params.productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, changeItemQuantityRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + changeItemQuantityRequestCount++]);
            });
        }
    })
});


router.post('/payment', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.body.cardNumber === 'undefined')
        return res.send({ error: 'you must provide a credit card number' });
    const receivingQueue = configs.apps.cart.proceedToPaymentRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.proceedToPaymentRoute.sendingQueues;
    const commands = configs.apps.cart.proceedToPaymentRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: proceedToPaymentRouteRequestCount,
        userID: req.headers.userId,
        cardNumber: req.body.cardNumber
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, proceedToPaymentRouteRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + proceedToPaymentRouteRequestCount++]);
            });
        }
    })
});

router.get('/delete/:productId', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.params.productId === 'undefined')
        return res.send({ error: 'you must provide a product ID' });
    const receivingQueue = configs.apps.cart.removeItemFromCartRoute.receivingQueue;
    const sendingQueues = configs.apps.cart.removeItemFromCartRoute.sendingQueues;
    const commands = configs.apps.cart.removeItemFromCartRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: removeItemFromCartRouteRequestCount,
        userID: req.headers.userId,
        productID: req.params.productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, removeItemFromCartRouteRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + removeItemFromCartRouteRequestCount++]);
            });
        }
    })
});

module.exports = router;