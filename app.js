var flash = require('connect-flash');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var formidable = require('formidable');
var fs = require('fs');

var dbConfig = require("./db.js");
var mongoose = require("mongoose");

mongoose.connect(dbConfig.url);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require("passport");
var expressSession = require("express-session");

app.use(expressSession({secret: "mySecretKey"}));
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require("./passport/init");
initPassport(passport);


var routes = require('./routes/index')(passport);
var umess = require('./routes/umess')(passport);
var user = require('./routes/user')(passport);
app.use('/', routes);
app.use('/', umess);
app.use('/', user);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
