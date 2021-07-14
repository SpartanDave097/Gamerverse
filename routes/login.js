var express = require('express');
var router = express.Router();
// const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.render('login'));

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Accedi' });
});

module.exports = router;