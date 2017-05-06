const router = express.Router();
let x = true;
const fs = require('fs');
router.post('/', upload.single('avatar'), function(req, res, next) {
    let path = req.file.path
    console.log(req.file.path);
    //return res.send({ success: 'image uploaded successfully' });

    var req = request.post("http://localhost:3444/upload", function(err, resp, body) {
        if (err) {
            console.log('Error!');
        } else {
            console.log('URL: ' + body);
        }
    });
    var form = req.form();
    form.append('avatar', fs.createReadStream(path));

})
module.exports = router;