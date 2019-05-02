const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const app = express();
const favicon = require('serve-favicon'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000}
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

mongoose.connect(process.env.MONGODB_URL || 'mongodb://doctamayot:calimenio3125@ds157723.mlab.com:57723/heroku_bxjt6kzm',{ useNewUrlParser: true 
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`App is running on port ${ PORT }`);
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
