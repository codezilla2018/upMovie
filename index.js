// import expree
const express = require('express');
const Twitter = require('twitter');
const config  = require('./config');
const fetch = require('node-fetch');
const Movie = require('./movie');
const axios = require('axios');

// initialize express
var app = express();



let listOfMovies;
let numOfPages;
let currentPage;


getMovies();

  var status = {
      status: 'this is my first tweer\nmy name is dilusha'+ new Date() + '#this'
  }


// twitter.post()

console.log('statted');

async function getRecentReleases(movieList) {
  for(let x= 0; x<movieList.length; x++) {
    let trailerUrl;
      if(movieList[x]['release_date'] > '2018-05-18') {
         //console.log(movieList[x]['title']);
        trailerUrl= await getTrailer(movieList[x]['id']);
        // console.log(trailerUrl);
        //let url2 = 'https://api.themoviedb.org/3/movie/'+ movieList[x]['id'] +'/videos?api_key=270ba5c916d80333b03881a53f708cb1&language=en-US';

        // rp(url2)
        //   .then(resp=>{
        //     console.log(resp.results);
        //   })



        if(trailerUrl) {
          let mv = {};
          mv.title = movieList[x]['title'];
          mv.trailler = trailerUrl;
          console.log(movieList[x]['title'] + ' ' +trailerUrl);
          tweet(mv);
        } else {
           console.log('i dont have trailer');
        }
      }

  }
}

function getMovies() {
  axios.get(genarateUrl(1))
    .then(response => {
      listOfMovies = response.data.results;
      numOfPages = response.data.total_pages;
      getRecentReleases(listOfMovies);

        for(let y = 1; y<=numOfPages; y++) {
          console.log('page'+y);
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

async function getTrailer(movie_id) {
  let url2 = 'https://api.themoviedb.org/3/movie/'+ movie_id +'/videos?api_key=270ba5c916d80333b03881a53f708cb1&language=en-US';
  let videoList;
  let key = '';
 
  const response = await fetch(url2);
  const data = await response.json();
  videoList = await data.results;

  for(let x = 0; x < videoList.length; x++) {
              if(videoList[x]['type'] == 'Trailer' && videoList[x]['site'] == 'YouTube') {
               key = await videoList[x]['key'];
               
               break;
              }
          }
          return key;
    
}

function tweet(movie) {

  //making the status
  let status = `${movie.title}\n#upMovie #new_release \n\n Trailer: https://www.youtube.com/watch?v=${movie.trailler}`;
  // initialize twitter
var twitter = new Twitter(config);
    twitter.post('statuses/update',status, function(error, tweet, response) {
      if(!error) {
          console.log(tweet);
      } else {
          console.log(error);
      }
  });

  //twitter.post();
}