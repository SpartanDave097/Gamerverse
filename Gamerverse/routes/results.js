var express = require('express');
var router = express.Router();
var axios = require('axios');
/* GET results page. */
router.get('/', function(req, res, next) {
    let rawdata = req.query.games;
    console.log(rawdata)
    var data = 'search "' + rawdata + '" ; fields *;';
    var config = {
    method: 'post',
    url: 'https://api.igdb.com/v4/games',
    //inserire parametri segreti
    ,
    data : data
    };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
    res.render('results', { title: 'Ecco qua' });
  });
module.exports = router;
