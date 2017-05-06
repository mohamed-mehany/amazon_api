const router = express.Router();
router.post('/', upload.single('khaled'), function(req, res, next) {
    //let path = req.file.path

    console.log(req.file);
    return res.send({ success: 'image uploaded successfully' });

    var req = request.post("http://localhost:3444/upload/2", function(err, resp, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('URL: ' + body);
            res.send({ success: body });
        }
    });
    var form = req.form();
    form.append('asd', fs.createReadStream(path));
});

router.post('/2', upload.single('asd'), function(req, res, next) {
    //let path = req.file.path
    console.log(req.file);
    //  console.log(req.body);
    console.log("omar essam" + req.file.filename);
    return res.send({ filename: req.file.filename });
})
module.exports = router;