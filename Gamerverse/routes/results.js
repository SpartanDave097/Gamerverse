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
    headers: {
    'Client-ID': 'nedtvnknix5gld0fdp1egtrrmpdgkx',
    'Authorization': 'Bearer j4lvkzif0jq6os85gb7l8dwyldpckw',
    'Content-Type': 'text/plain',
    'Cookie': '__cfduid=d6f76f8488a22b191d3ee9f8819ff73d31614101565'
    },
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