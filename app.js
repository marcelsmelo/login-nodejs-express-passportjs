var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');

var app = express();

var config = require('./config/config.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/** BANCO DE DADOS **/

var dbname=config.db.sgbd;
var username='';
var password='';
var dbPort='';
var host='';
var database='';
var url='';
switch(dbname){
    case 'mongodb':
        var opts={
            server:{
                socketOptions:{keepAlive:1}
            }
        };
        username=config.db.username;
        password=config.db.password;
        dbPort=config.db.port;
        host=config.db.host;
        database=config.db.database;
        //url='mongodb://'+username+":"+password+"@"+host+":"+dbPort+"/"+database;
        url = 'mongodb://'+host+'/'+database;

        console.log("MongoDB URL: "+url);

        var mongoose=require('mongoose');
        //mongoose.connect(url, opts);
        mongoose.connect(url);
        break;
    default:
        throw new Error("Banco de dados desconhecido: "+dbname);
        break;
}

/****************
 *** PASSPORT ***
 ****************/
require('./lib/passport.js')(passport);
app.use(require('express-session')({
    secret: 'testesenhasecreta'
  }));
app.use(passport.initialize());
app.use(passport.session());

/**********************
 *** FLASH MESSAGES ***
 **********************/
app.use(require('connect-flash')());

/**********************
 ******** ROTAS *******
 **********************/
require('./lib/route_loader.js')(app);



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
