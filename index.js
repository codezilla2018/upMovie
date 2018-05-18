// import expree
const express = require('express');
const Twitter = require('twitter');
const https = require('https');
const axios = require('axios');
const config  = require('./config');

// initialize express
var app = express();



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
        getTrailer(movieList[x]['id']);
      }

  }
}

function getMovies() {
  axios.get(genarateUrl(1))
    .then(response => {
      listOfMovies = response.data.results;
      numOfPages = response.data.total_pages;
      getRecentReleases(listOfMovies);

        for(let y = 2; y<=numOfPages; y++) {
          getMoviesByPage(y)
        }
      // console.log(response.data.results);
    })
    .catch(err => {
      console.log(err.msg);
    });
}

function getMoviesByPage(page) {
  axios.get(genarateUrl(page))
    .then( response => {
      listOfMovies = response.data.results;
      numOfPages = response.data.total_pages;
      getRecentReleases(listOfMovies);
    })
    .catch(err => {
      console.log(err.msg);
    })
}

function genarateUrl(page) {
  let date = new Date();
  let minDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-'+ (date.getDate()+1);
  let maxDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-'+ (date.getDate()+2);
  let url =  'https://api.themoviedb.org/3/discover/movie?api_key=270ba5c916d80333b03881a53f708cb1&release_date.gte='+ minDate +'&release_date.lte='+ maxDate + '&page=' + page;
  
  return url;
}

function getTrailer(movie_id) {
  let url2 = 'https://api.themoviedb.org/3/movie/'+ movie_id +'/videos?api_key=270ba5c916d80333b03881a53f708cb1&language=en-US';
  let videoList;
  axios.get(url2)
    .then(resp=>{
      videoList = resp.data.results;
      //console.log(videoList);
      
        for(let x = 0; x < videoList.length; x++) {
            if(videoList[x]['type'] == 'Trailer' && videoList[x]['site'] == 'YouTube') {
             return videoList[x]['key'];
             break;
            }
        }
    })
    .catch(err=> {
      console.log(err.msg);
    })
}