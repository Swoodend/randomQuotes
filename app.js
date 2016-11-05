'use strict';

//setup stuff
const express = require("express");
const cookieParser = require("cookie-parser");
const request = require("request");
const Twitter = require("node-twitter-api");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

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

const twitter = new Twitter({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callback: "http://localhost:1337/twitter/callback"
});

let REQUESTTOKEN;
let REQUESTSECRET;
let ACCESSTOKEN;
let ACCESSTOKENSECRET;
let msg;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));



app.get('/', function(req, res){
  res.render('index');
});

app.get('/twitter/callback', function(req, res){
  //this is your callback after the user logs in at the oauth page
  let oauthToken = req.query.oauth_token;
  let oauthVerifier = req.query.oauth_verifier;
  twitter.getAccessToken(REQUESTTOKEN, REQUESTSECRET, oauthVerifier, function(err, accessToken, accessTokenSecret){
    ACCESSTOKEN = accessToken;
    ACCESSTOKENSECRET = accessTokenSecret;
    return postTweet(ACCESSTOKEN, ACCESSTOKENSECRET, msg);
  });
  res.render('index');
});

app.post('/twitter/request-token', function(req, res){
  msg = req.body.quoteToTweet;
  if(!ACCESSTOKEN){
    twitter.getRequestToken(function(err, requestToken, requestSecret){
      if (err){
        res.send(err);
      }else{
        let verificationUrl = 'https://twitter.com/oauth/authenticate?oauth_token=' + requestToken;
        REQUESTTOKEN = requestToken;
        REQUESTSECRET = requestSecret;
        res.send(verificationUrl);
      }
    });
  } else {
    postTweet(ACCESSTOKEN, ACCESSTOKENSECRET, msg);
  }
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


function postTweet(at, as, msg){
  twitter.statuses("update", {
      status: msg,
    },
    ACCESSTOKEN,
    ACCESSTOKENSECRET,
    function(err, data, response){
      if(err){
        console.log(err);
      } else {
        console.log('tweeted', msg);
      }
    }
  )
}

app.listen(1337, function(){
  console.log("app listening on port 1337");
});

