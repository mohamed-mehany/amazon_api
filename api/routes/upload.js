const router = express.Router();

router.post('/', upload.single('avatar'), function(req, res, next) {
    return res.send({ success: 'image uploaded successfully' });
})
module.exports = router;