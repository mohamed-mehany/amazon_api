const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let logInRequestCount = 1;
let viewProfileRequestCount = 1;
let editProfileRequestCount = 1;
let createUserRequestCount = 1;
/* -- counters -- */

router.post('/login', function(req, res) {
    if (typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined')
        return res.send({ error: 'you must provide an email and a password' });
    const receivingQueue = configs.apps.users.logInRoute.receivingQueue;
    const sendingQueues = configs.apps.users.logInRoute.sendingQueues;
    const commands = configs.apps.users.logInRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: logInRequestCount,
        strEmail: req.body.email,
        strPassword: req.body.password,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, logInRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + logInRequestCount++]);
            });
        }
    })
});

router.get('/profile', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    const receivingQueue = configs.apps.users.viewProfileRoute.receivingQueue;
    const sendingQueues = configs.apps.users.viewProfileRoute.sendingQueues;
    const commands = configs.apps.users.viewProfileRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: viewProfileRequestCount,
        user_id: req.headers.userId,
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, viewProfileRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + viewProfileRequestCount++]);
            });
        }
    })
});

router.post('/profile/edit', function(req, res) {
    if (typeof req.headers.userId === 'undefined')
        return res.send({ error: 'you must be logged in' });
    if (typeof req.body.email === 'undefined' || typeof req.body.name === 'undefined' ||
        typeof req.body.address === 'undefined' || typeof req.body.dateOfBirth === 'undefined')
        return res.send({ error: 'you must provide all information' });
    const receivingQueue = configs.apps.users.editProfileRoute.receivingQueue;
    const sendingQueues = configs.apps.users.editProfileRoute.sendingQueues;
    const commands = configs.apps.users.editProfileRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: editProfileRequestCount,
        user_id: req.headers.userId,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        date_of_birth: req.body.dateOfBirth
    };
    const requests = consumer.createRequests(url, receivingQueue, sendingQueues, commands, data);
    parallel.parallelize(requests, function(response) {
        if (response) {
            res.send(response);
        } else {
            consumer.wait(receivingQueue, editProfileRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + editProfileRequestCount++]);
            });
        }
    })
});

router.post('/create', function(req, res) {
    if (typeof req.body.email === 'undefined' || typeof req.body.name === 'undefined' || typeof req.body.address === 'undefined' ||
        typeof req.body.password === 'undefined' || typeof req.body.passwordCheck === 'undefined' || typeof req.body.dateOfBirth === 'undefined' ||
        typeof req.body.gender === 'undefined')
        return res.send({ error: 'you must provide all information' });
    if (req.body.password != req.body.passwordCheck)
        return res.send({ error: 'password does not match' });

    const receivingQueue = configs.apps.users.registerRoute.receivingQueue;
    const sendingQueues = configs.apps.users.registerRoute.sendingQueues;
    const commands = configs.apps.users.registerRoute.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: createUserRequestCount,
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
            consumer.wait(receivingQueue, createUserRequestCount, numberOfRequests, function() {
                res.send(rabbit[receivingQueue + createUserRequestCount++]);
            });
        }
    })
});

module.exports = router;