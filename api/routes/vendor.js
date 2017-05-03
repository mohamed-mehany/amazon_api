const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let createVendorRequestCount = 1;
let addProductRequestCount = 1;
let deleteProductRequestCount = 1;
/* -- counters -- */

router.post('/create', function(req, res) {
    if (typeof req.body.email === 'undefined' || typeof req.body.name === 'undefined' || typeof req.body.address === 'undefined' ||
        typeof req.body.password === 'undefined' || typeof req.body.passwordCheck === 'undefined')
        return res.send({ error: 'you must provide all information' });
    if (req.body.password != req.body.passwordCheck)
        return res.send({ error: 'password does not match' });

    const receivingQueue = configs.apps.vendors.registerRoute.receivingQueue;
    const sendingQueues = configs.apps.vendors.registerRoute.sendingQueues;
    const commands = configs.apps.vendors.registerRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: createVendorRequestCount,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        date_of_birth: req.body.dateOfBirth
    };
    let token = jwt.sign(data, 'ser-amazon');
    data['password'] = req.body.password;
    data['token'] = token;
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, createVendorRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + createVendorRequestCount++]);
            });
        }
    })
});

router.post('/createProduct', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.body.name === 'undefined' || typeof req.body.vendor_id === 'undefined' || typeof req.body.description === 'undefined' ||
        typeof req.body.department_id === 'undefined' || typeof req.body.size === 'undefined' || typeof req.body.stock === 'undefined' 
        || typeof req.body.colour === 'undefined' || typeof req.body.price === 'undefined' || typeof req.body.image_path === 'undefined')
        return res.send({ error: 'you must provide all product information' });

    const receivingQueue = configs.apps.vendors.addProductRoute.receivingQueue;
    const sendingQueues = configs.apps.vendors.addProductRoute.sendingQueues;
    const commands = configs.apps.vendors.addProductRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: addProductRequestCount,
        name: req.body.name,
        vendor_id: req.body.vendor_id,
        description: req.body.description,
        department_id: req.body.department_id,
        size: req.body.size,
        stock: req.body.stock,
        colour: req.body.colour,
        price: req.body.price,
        image_path: req.body.image_path
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, addProductRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + addProductRequestCount++]);
            });
        }
    })
});

router.delete('/deleteProduct/:productId', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.params.productId === 'undefined')
        return res.send({ error: 'you must provide a product ID' });

    const receivingQueue = configs.apps.vendors.deleteProductRoute.receivingQueue;
    const sendingQueues = configs.apps.vendors.deleteProductRoute.sendingQueues;
    const commands = configs.apps.vendors.deleteProductRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: deleteProductRequestCount,
        product_id: req.params.productId
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, deleteProductRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + deleteProductRequestCount++]);
            });
        }
    })
});

module.exports = router;