const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let createVendorRequestCount = 1;
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

module.exports = router;