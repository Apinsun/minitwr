var flash = require('connect-flash');
var express = require('express');
var moment = require('moment');
var router = express.Router();

var im = require('../models/im');
var user = require('../models/user');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

    router.get('/profile', isAuthenticated, function(req, res){
                im.find().limit(req.body.count).sort({date: -1}).exec( function (err, ims) {
              if (err) return console.error(err);
                res.render('profile', { title: 'uMess', user: req.user, im: ims});
            });
    });

    router.post('/profile', isAuthenticated, function(req, res) {
        var date = moment().format('DD/MM/YYYY, HH:mm');
  		var newim = new im({firstName: req.user.firstName, surname: req.user.surname, username: req.user.username, imtext: req.body.Im, date: date, picture: req.user.picture});
  		newim.save();
        res.redirect('/profile');
    });


 return router;
}