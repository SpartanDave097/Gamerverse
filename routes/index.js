var express = require('express');
var router = express.Router();
var axios = require('axios');
// const { forwardAuthenticated } = require('../config/auth');

const {ensureAuthenticated} = require('../public/javascripts/authControl');

// Welcome Page
router.get('/', (req, res) => res.render('index'));

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Gamerverse' });
});

module.exports = router;
