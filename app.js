const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const favicon = require('serve-favicon');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// routes

require('./routes/polls.js')(app);
require('./routes/account.js')(app);

//passport config
var Account = require('./model/account.js');
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/shop',{ useNewUrlParser: true 
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.listen(process.env.PORT || 3000, ()=>{
  console.log('API REST corriendo en http://localhost')
})

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
