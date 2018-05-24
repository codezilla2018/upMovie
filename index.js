// import expree
const express = require('express');
const Twitter = require('twitter');
const config  = require('./config/twitter');
const tmdbconfig = require('./config/tmdb');
const fetch = require('node-fetch');
const Movie = require('./movie');
const axios = require('axios');
const sheduler = require('node-schedule');

// initialize express
var app = express();


let listOfMovies; // this will keep the list of movies
let numOfPages;  // holds the value of result pages
let currentPage; // hold the value of current page

var twitter = new Twitter(config); // initialize twitter

var schedule = require('node-schedule');

// const port = 8000;
console.log(new Date());

// app.get('/', (req,res)=>{
//   res.send("home pagekk");
// });

// app.listen(port, ()=>{
//   console.log('server start on port '+ port);
// });

//getMovies();

schedule.scheduleJob('49 15 * * *', ()=> { // call get method at 09.03H for every day
  console.log('my time is set');
  //getMovies();
})

// further filter recent movies from api result
async function getRecentReleases(movieList) {
  for(let x= 0; x<movieList.length; x++) {
    let date = new Date();
    let month = date.getMonth() +1;
    if (month <10){
      month = '0' + month;
    }
    date = date.getFullYear() + '-' + month + '-'+ (date.getDate()+1);
    //console.log(date.valueOf());
    //console.log(movieList[x]['release_date']);
    let trailerUrl;
      if(movieList[x]['release_date'] == date ) {
        
        trailerUrl= await getTrailer(movieList[x]['id']);
       
        if(trailerUrl) {
          let mv = {};
          mv.title = movieList[x]['title'];
          mv.trailler = trailerUrl;
          //console.log(movieList[x]['title'] + ' ' +trailerUrl);
          tweet(mv);
        } else {
           console.log(movieList[x]['title'] + ' I dont have trailer');
        }
      } else{
        //console.log(date);
      }

  }
}

// get list of movies 
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

// get list of movies of given page
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

// genarate url from current date
function genarateUrl(page) {
  let date = new Date();
  let minDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-'+ (date.getDate()+1);
  let maxDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-'+ (date.getDate()+2);
  let url =  `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbconfig}&release_date.gte=`+ minDate +'&release_date.lte='+ maxDate + '&page=' + page;
  //console.log(url);
  return url;
}

// get trailler url for given movie
async function getTrailer(movie_id) {
  let url2 = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${tmdbconfig}&language=en-US`;
  let videoList;
  let key = '';
 
  const response = await fetch(url2);
  const data = await response.json();
  videoList = await data.results;
  if(videoList) {
    for(let x = 0; x < videoList.length; x++) {
      if(videoList[x]['type'] == 'Trailer' && videoList[x]['site'] == 'YouTube') {
       key = await videoList[x]['key'];
       
       break;
      }
  }
  return key;

}
  }
  

// tweet on given movie
function tweet(movie) {
  //making the status
  let title = movie.title.replace(/ /g,"_");
  var status = {
    status: `${movie.title}\n #${title} test #upMovie #new_release #2k18 #codezilla2k18\nhttps://www.youtube.com/watch?v=${movie.trailler}`
  }
  //console.log(status);
  
    twitter.post('statuses/update',status, function(error, tweet, response) {
      if(!error) {
          console.log(tweet);
      } else {
          console.log(error);
      }
  });

  //twitter.post();
}