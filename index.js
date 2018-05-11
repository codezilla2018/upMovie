// import expree
const express = require('express');
const Twitter = require('twitter');
//const config  = require('config');

// initialize express
var app = express();

// initialize twitter
var twitter = new Twitter({
    consumer_key: 'C8RqMleO8N2ZGSnMAez2RjKQK',
    consumer_secret: 'YB13RsWagJPJOCidfFJYmQ5jdZy8PNW0zAcjxLo5bZ9GrhS1ee',
    access_token_key: '830079314318262274-9JrL6Hsz5iQsiOO5Rtcx2nXhlspEzlw',
    access_token_secret: 'KtNd9wVhrqfB3GECLeGFjgbXxUFQ8TpSRkJUOxRjVv32A'
  });


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