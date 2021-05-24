const TwitterStrategy = require('passport-twitter').Strategy
const mongoose = require('mongoose')
const UserT = require('../models/User')


// About access with Twitter
module.exports = function(passport){
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUserT = {
            twitterId: profile.id,
            displayName: profile.displayName,
        }

        try {  // Check for existing user
            let user = await UserT.findOne({twitterId: profile.id})
            if(user){
                done(null, user)
            } else {
                user = await UserT.create(newUserT)
                done(null, user)
            }
        } catch (err){
            console.error(err)
        }
    }))

    passport.serializeUser((user, cb) => {
    cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
    cb(null, obj);
    });
}