var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../app');

/* GET results page. */
router.get('/', function(req, res, next) {

    //localStorage.clear();
    let rawdata = req.query.games;
    //console.log(rawdata);
    var initialData = "";

    initialData = axiosData(rawdata);

    initialData.then(function(result) {
      initialData = result;
    })
    .then(function(newResult) {
      //console.log(initialData);

      res.render('results', { 
        title: 'Ecco qua',
        fileJson1: initialData,
        giocoCercato: rawdata
    });
  });
});



module.exports = router;

/* Funzioni di supporto*/

function axiosData(incomingdata){

  var data = 'search "' + incomingdata + '" ; fields id,name,first_release_date,cover.image_id,cover.height,aggregated_rating,genres.name,dlcs.cover.image_id,dlcs.name, platforms.name, summary, websites.url, websites.category, videos.video_id, videos.name; limit 20; where version_parent = null & parent_game = null & cover != null;';
  var config = {
  method: 'post',
  url: 'https://api.igdb.com/v4/games',
  headers: {
      // Robe
      'Client-ID': 'nedtvnknix5gld0fdp1egtrrmpdgkx',
      'Authorization': 'Bearer j8gl1mstojg2ddk6mytfcixkcbzbvl',
      'Content-Type': 'text/plain',
      'Cookie': '__cfduid=d6f76f8488a22b191d3ee9f8819ff73d31614101565'
    },
  data : data
  };

  var text = axios(config)
  .then(response => {
    var data = response.data;
    return data;
  })
  .catch(function (error) {
  console.log(error);
  });

  text.then(function(result) {
    text = result;
  });

  return text;
}