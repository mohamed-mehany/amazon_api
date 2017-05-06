const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let indexProductsRequestCount = 1;
let sortProductsRequestCount = 1;
let viewProductRequestCount = 1;
/* -- counters -- */


router.get('/', function(req, res) {
    const receivingQueue = configs.apps.products.indexProductsRoute.receivingQueue;
    const sendingQueues = configs.apps.products.indexProductsRoute.sendingQueues;
    const commands = configs.apps.products.indexProductsRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: indexProductsRequestCount
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, indexProductsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + indexProductsRequestCount++]);
            });
        }
    })
});

router.get('/sort/:sortingMethod', function(req, res) {
    if (typeof req.params.sortingMethod === 'undefined')
        return res.send({ error: 'you must provide a sorting Method' });
    const receivingQueue = configs.apps.products.sortProductsRoute.receivingQueue;
    const sendingQueues = configs.apps.products.sortProductsRoute.sendingQueues;
    const commands = configs.apps.products.sortProductsRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: sortProductsRequestCount,
        sorting_method: req.params.sortingMethod
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, sortProductsRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + sortProductsRequestCount++]);
            });
        }
    })
});

router.get('/:productId', function(req, res) {
    if (typeof req.params.productId === 'undefined')
        return res.send({ error: 'you must provide a product ID' });
    const receivingQueue = configs.apps.products.viewProductRoute.receivingQueue;
    const sendingQueues = configs.apps.products.viewProductRoute.sendingQueues;
    const commands = configs.apps.products.viewProductRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: viewProductRequestCount,
        product_id: req.params.productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, viewProductRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + viewProductRequestCount++]);
            });
        }
    })
});

module.exports = router;