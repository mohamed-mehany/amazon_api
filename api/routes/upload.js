const router = express.Router();

router.post('/', upload.single('avatar'), function(req, res, next) {
    console.log(req.file);
    console.log(req.body.password);
    console.log(req.body.name);
    return res.send({ success: 'image uploaded successfully' });
})
module.exports = router;