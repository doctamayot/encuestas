const Account = require('../model/account.js');
const passport = require('passport');

// Render new Account form
exports.new = (req, res) => {
  res.render('accounts/register');
};

// Create and Save a new Account
exports.create = (req, res) => {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if(err) {
      console.log(err.message);
      return res.render('accounts/register', { error: err.message });
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};

// Render form for new session
exports.newSession = (req, res) => {
  res.render('accounts/login');
};

// Create the session
exports.createSession = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    // Generate a JSON response reflecting authentication status
    if(!user) {
      return res.render('accounts/login', { error: info.message });
    }
    req.login(user, loginErr => {
      if(loginErr) {
        return next(loginErr);
      }
      console.log(user)
      req.app.locals.user = user;
      console.log(req.app.locals)
      return res.redirect('/');
    });
  })(req, res, next);
};

// destroy the session
exports.destroySession = (req, res, next) => {
  req.logout();
  res.redirect('/');
  !user
};


