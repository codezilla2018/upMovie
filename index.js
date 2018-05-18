// import expree
const express = require('express');
const Twitter = require('twitter');
const https = require('https');
const axios = require('axios');
const config  = require('./config');

// initialize express
var app = express();

let url = 'https://api.themoviedb.org/3/discover/movie?api_key=270ba5c916d80333b03881a53f708cb1&release_date.gte='+new Date()+1 +'&release_date.lte=2018-06-20';
console.log(url);
let listOfMovies;
let numOfPages;
let currentPage;

//getMovies();

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

function getRecentReleases(movieList) {
  for(let x= 0; x<movieList.length; x++) {
    
      if(movieList[x]['release_date'] > '2018-05-18') {
        console.log(movieList[x]['release_date']);
      }

  }
}

function getMovies() {
  axios.get(url)
    .then(response => {
      listOfMovies = response.data.results;
      numOfPages = response.data.total_pages;
      getRecentReleases(listOfMovies);
      // console.log(response.data.results);
    })
}