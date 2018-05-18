// import expree
const express = require('express');
const Twitter = require('twitter');
const https = require('https');
const axios = require('axios');
const config  = require('./config');

// initialize express
var app = express();

let url = 'https://api.themoviedb.org/3/discover/movie?api_key=270ba5c916d80333b03881a53f708cb1&release_date.gte=2018-05-16&release_date.lte=2018-06-17';
let listOfMovies;
axios.get(url)
  .then(response => {
    listOfMovies = response.data.results;
    // console.log(response.data.results);
  })


// initialize twitter
var twitter = new Twitter(config);


  var status = {
      status: 'this is my first tweer\nmy name is dilusha'+ new Date() + '#this'
  }
//   twitter.post('statuses/update',status, function(error, tweet, response) {
//       if(!error) {
//           console.log(tweet);
//       } else {
//           console.log(error);
//       }
//   })



// twitter.post()

console.log('statted');