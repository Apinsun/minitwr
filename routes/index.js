var flash = require('connect-flash');
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport) {

/*INDEX*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'uMess' });
});

/*LOGIN*/
router.post('/login', passport.authenticate('login', {
	successRedirect: '/profile',
	failureRedirect: '/',
	failureFlash: true }));

/*REGISTER*/
router.get('/signup', function(req,res,next) {
  res.render('signup', { title: 'uMess' }); 
});

/*SIGNIN*/
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true }));

/*SIGNOUT*/
router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/'); });

return router;
}
