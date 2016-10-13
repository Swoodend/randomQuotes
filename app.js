'use strict';

//bg colors
// red - #FF3B3B
// purple - #BF52FF
// green - #78FF52
// yellow - #FFFE52
// orange - #FA892D


//setup stuff
const express = require("express");
const request = require("request");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname)));
// var movieRequest = {
//   url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
//   headers: {
//     "X-Mashape-Key": process.env.MOVIEKEY,
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Accept": "application/json"
//   }
// };

// var famousRequest = {
//   url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
//   headers: {
//     "X-Mashape-Key": process.env.FAMOUSKEY,
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Accept": "application/json"
//   }
// };



// app.get("/", function(req, res){
//   request(movieRequest, function(err, resp, requ){
//     res.send(resp.body);
//   });

// });

app.get('/', function(req, res){
  res.render('index');
});

app.listen(1337, function(){
  console.log("app listening on port 1337");
});

