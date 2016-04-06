var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var hbs = require('express-hbs');
const mongoose = require('mongoose');

var app = express();


//Banco de dados
const connection = require('./config/db.js')(mongoose);

/**********************
 *** FLASH MESSAGES ***
 **********************/
app.use(require('connect-flash')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'qualquercoisaksadnckjadscdscdscndc',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(function(req, res, next) {
  req.session.cookie.maxAge = 2592000000;
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./lib/passport.js')(passport);

/**********************
 ******** ROTAS *******
 **********************/
require('./lib/router_load.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
