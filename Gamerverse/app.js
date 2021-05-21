var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');            //dependencies for database
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socket = require('socket.io');              //depedencies for WebSocket
const dotenv = require('dotenv'); 
const passport = require('passport');           //dependecies for authentication 
const connectDB = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authGoogle = require('./routes/auth');
var resultsRouter = require('./routes/results');
var chatRouter = require('./routes/chat');

var app = express();

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connection DB
connectDB()

// Logging
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
