var flash = require('connect-flash');
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();

var user_model = require('../models/user');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

	router.get('/user', isAuthenticated, function(req, res){
                res.render('user', { title: 'uMess', user: req.user, name_picture: req.user.picture});
            });


    router.post('/user', isAuthenticated, function(req, res){
		user_model.find({username: req.body.SelectedUserName}).exec(function (err, user) {
			if(user.length == 0 || req.body.SelectedUserName == req.user.username) {
				user_model.update({_id: req.user._id}, {$set: { firstName: req.body.SelectedFirstName, surname: req.body.SelectedSurname, username: req.body.SelectedUserName, mail: req.body.SelectedMail, additional: req.body.SelectedAdditional, name_picture: req.user.picture }}, { upsert: true }, function(){});
				res.redirect('user');
			} else {
				var error = 1;
				res.render('user', { title: 'uMess', user: req.user, name_picture: req.user.picture, error: error});
			}
		});
	});

    router.post('/upload', isAuthenticated, function(req, res) {
  	var form = new formidable.IncomingForm();
  	form.uploadDir = "./public/account_pictures";

		// delete the old picture
		if(req.user.picture != "default.png")
		{
			fs.unlink("/public/account_pictures/" + req.user.picture, function(err) {
				if(err) console.log(err);
			})
		}

  	form.parse(req, function (err, fields, files) {
            var new_picture = files.upload.path.substring(24);
  					user_model.update({username: req.user.username}, {$set: { picture: new_picture}}, { upsert: true }, function(){});
        });
  	res.redirect('/user');
  	});

 return router;
}