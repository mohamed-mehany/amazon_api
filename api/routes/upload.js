const router = express.Router();

router.post('/', upload.single('avatar'), function(req, res, next) {
    console.log(req.file);
    return res.send({ success: 'image uploaded successfully' });
})
module.exports = router;