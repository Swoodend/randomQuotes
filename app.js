'use strict';

//setup stuff
const express = require("express");
const request = require("request");
const Twitter = require("twitter");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const movieRequest = {
  url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
  headers: {
    "X-Mashape-Key": process.env.APIKEY,
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  }
};

const famousRequest = {
  url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
  headers: {
    "X-Mashape-Key": process.env.APIKEY,
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  }
};

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res){
  let quoteRequested = req.body.quoteType;
  function cb(err, response, body){
    if (!err & response.statusCode === 200){
      let info = JSON.parse(body);
       res.send({
        quote: info.quote,
        author: info.author
       });
    }
  }
  if (quoteRequested === 'movie'){
    request(movieRequest, cb);
  } else {
    request(famousRequest, cb);
  }
});

app.post('/tweet', function(req, res){
  let quote = req.body.quoteToTweet;
  let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  client.post("statuses/update", {status: quote}, function(error, tweet, response){
    if (error){
      console.log(error)
    }
    console.log('tweeted');
  });
});

app.listen(1337, function(){
  console.log("app listening on port 1337");
});

