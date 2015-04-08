var express = require('express');
var router = express.Router();

var tweets = [];

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'uTweet' });
});

router.get('/user', function(req, res, next) {
res.render('user', { title: 'uTweet - User', tweets: tweets });
});

router.post('/user', function(req, res, next) {
tweets.unshift(req.body.tweet);
res.redirect('/user')
});

module.exports = router;
