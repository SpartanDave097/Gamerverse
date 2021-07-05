const express = require('express')
const passport = require('passport')
const router = express.Router()

// Auth with Google
// GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile'] }))

// Google auth callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/' }), (req, res) => {
    res.redirect('/')
})

// Logout user (da rivedere)
// /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// Auth with Twitter 
router.get('/twitter', passport.authenticate('twitter'));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

// Twitter auth callback
router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }), (req, res, next) => {
    res.redirect('/');
});

module.exports = router