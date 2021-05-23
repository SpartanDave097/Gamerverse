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
    var coverData = "";
    var ids = "";

    initialData = axiosData(rawdata);

    initialData.then(function(result) {
      initialData = result;
    })
    .then(function(newResult) {
      //console.log(initialData);
      ids = getIds(initialData);
    })
    .then(function(newResult) {
      coverData = axiosCoverById(ids);

      coverData.then(function(result) {
        coverData = result;
        //console.log(coverData);
      })
      .then(function(newResult) {
        initialData = addCover(initialData,coverData);
      })
      .then(function(newResult) {
        //console.log(rawdata);

        res.render('results', { 
          title: 'Ecco qua',
          fileJson1: initialData,
          giocoCercato: rawdata
      });


        });
    });
  });


module.exports = router;

/* Funzioni di supporto*/

function axiosData(incomingdata){

  var data = 'search "' + incomingdata + '" ; fields id,name,first_release_date,storyline,summary;';
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

function axiosCoverById(incomingdata){

  var data = 'where game = (' + incomingdata + '); fields game,height,image_id,url,width;';
  var config = {
  method: 'post',
  url: 'https://api.igdb.com/v4/covers',
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

//Funge!!!!
function addCover(initialData,coverData){

  var data = initialData;
  var id;
  var i = 0;
  var a = 0;
  for(i;i<initialData.length;i++){
    id = initialData[i].id;
    for(a=0;a<coverData.length;a++){
      if (id == coverData[a].game)
        data[i].coverId = coverData[a].image_id;
      else
        continue;
    }
  }

  return data;  
}

function getIds(JSONdata){
  var ids = JSONdata[0].id;
  var i = 1;
  for(i;i<JSONdata.length;i++){
    ids = ids + ", " + JSONdata[i].id;
  }

  //console.log(ids);
  return ids;
}
