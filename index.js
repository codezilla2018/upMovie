// import expree
const express = require('express');
const Twitter = require('twitter');
const config  = require('./config');

// initialize express
var app = express();

// initialize twitter
var twitter = new Twitter(config);


  var status = {
      status: 'this is my first tweer'
  }
  twitter.post('statuses/update',status, function(error, tweet, response) {
      if(!error) {
          console.log(tweet);
      } else {
          console.log(error);
      }
  })

// twitter.post()

console.log('statted');