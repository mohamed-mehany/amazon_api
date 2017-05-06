const router = express.Router();
router.post('/', upload.single('asd'), function(req, res, next) {
    //let path = req.file.path
    console.log(req.file);
    //  console.log(req.body);
    console.log("omar essam" + req.file.filename);
    return res.send({ filename: req.file.filename });
})
module.exports = router;