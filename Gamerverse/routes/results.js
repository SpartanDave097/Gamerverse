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

  var data = 'search "' + incomingdata + '" ; fields id,name,first_release_date,cover.image_id,cover.image_id,aggregated_rating,genres.name,dlcs.cover.image_id,dlcs.name,platforms.name, summary; limit 20; where version_parent = null & parent_game = null & cover != null;';
  var config = {
  method: 'post',
  url: 'https://api.igdb.com/v4/games',
  headers: {
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