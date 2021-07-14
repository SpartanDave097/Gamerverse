var express = require("express");
var router = express.Router();

var passportTwitter = require('../auth/twitter');
var passportGoogle = require('../auth/google');
var User = require('../models/User');

const {ensureAuthenticated} = require('../public/javascripts/authControl');

//log-in routes
router.get('/login', (req,res) =>{
  res.render('login');
});

//log-out routes
router.get('/logout', (req,res) =>{
  req.logout();
  console.log("logout")
  req.flash('success_msg', 'Logged out')
  res.redirect('/login');
});

/* TWITTER ROUTER */
router.get('/twitter',
  passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;