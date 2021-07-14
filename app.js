var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');            //dependencies for database
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv'); 
const passport = require('passport');           //dependecies for authentication 
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var resultsRouter = require('./routes/results');
var chatRouter = require('./routes/chat');
var dashboardRouter = require('./routes/dashboard');


var auth = require('./routes/auth');
var app = express();

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
var passportTwitter = require('./auth/twitter');
var passportGoogle = require('./auth/google');

// Connection DB
connectDB()

// Logging
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Session
app.use(session({
  secret: 'game',
  resave: true,
  saveUninitialized: true

}))

// Passport middleware
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/results', resultsRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/dashboard', dashboardRouter);
app.use('/auth', auth);

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
