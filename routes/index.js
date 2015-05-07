var flash = require('connect-flash');
var express = require('express');
var router = express.Router();
var tweets = [];

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport) {

/*Get login (index) page*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'uMess' });
});

/*login post handle*/
router.post('/login', passport.authenticate('login', {
	successRedirect: '/profile',
	failureRedirect: '/',
	failureFlash: true }));

/*get signin page*/
router.get('/signup', function(req,res,next) {
  res.render('signup', { title: 'uMess' }); 
});

/*signin post handle*/
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true }));

/*get user profile (home) page*/
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'uMess', tweets: tweets, user: req.user });
});

/*im post handle*/
router.post('/profile', function(req, res, next) {
tweets.unshift(req.body.tweet);
res.redirect('/profile')
});

/*signout handle*/
router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/'); });

return router;
}
