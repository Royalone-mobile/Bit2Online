var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var db      = require('./db');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/environment');
var index = require('./routes/index');
var users = require('./routes/users');
var log     = require('./util/logger').logger;
var consts = require('./helpers/config');
var users = require('./routes/users');
require('./util/promisify');
require('./util/errors');
require('./auth/strategies')();


var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//Port
app.set('port', config.get('port'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
 // app.use('/users', users);

// catch 404 and forward to error handler


require('./routes')(app);

if (app.get('env') !== 'test') {
  db.connect();

  // app.listen(app.get('port'), function() {
  //   log.info('Express server started', 'environment=' + config.get('env'), 'listening on port=' + config.get('port'));
  // });
}


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });




consts.setSocket(io);

var socketHelper = require('./helpers/socketio');
module.exports = app;
