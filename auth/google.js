var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');


passport.use('google', new GoogleStrategy({
    clientID: "804910218147-rg2qm78gfi0e5o1ddj99cduk88m6s2gs.apps.googleusercontent.com",
    clientSecret: "UcYRQuCELOFcT1cg0M1WIKpf",
    callbackURL: 'https://localhost/auth/google/callback/'
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;