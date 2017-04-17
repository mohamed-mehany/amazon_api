const router = express.Router();
const url = configs.apps.protocol + '://' + configs.apps.ip + '';
/* -- counters -- */
let logInRequestCount = 1;
let viewProfileRequestCount = 1;
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
    console.log(data)
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
    const receivingQueue = configs.apps.users.viewProfile.receivingQueue;
    const sendingQueues = configs.apps.users.viewProfile.sendingQueues;
    const commands = configs.apps.users.viewProfile.commands;
    const numberOfRequests = commands.length;
    const data = {
        requestId: viewProfileRequestCount,
        user_id: req.headers.userId,
    };
    console.log(data)
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

module.exports = router;