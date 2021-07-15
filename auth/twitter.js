var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use('twitter',new TwitterStrategy({
    consumerKey: "XdZTS4rK9j7PQ6ut1VXLiKamJ",
    consumerSecret: "inB3RkSsZHR1DBVyvfW4T9JruGa9wHKJh5Z1ET7Ms8bJEZXaRj",
    callbackURL: 'http://localhost:3000/auth/twitter/callback/'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) {
        console.log(err); 
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;