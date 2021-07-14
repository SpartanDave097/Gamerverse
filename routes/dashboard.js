var express = require("express");
var router = express.Router();

const {ensureAuthenticated} = require('../public/javascripts/authControl');

router.get('/', ensureAuthenticated, (req,res) => {
    res.render("dashboard", {user: req.user})
});

module.exports = router;
