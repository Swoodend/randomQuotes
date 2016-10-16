'use strict';
let last;
let movieUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies";
let famousUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";


$(document).ready(function(){
  $('body').click(function(){
    setBackground();
  });

  $('#movie-quote').click(function(){
    $.ajax({
      url: '/',
      method: "POST",
      data: {
        quoteType: "movie"
      },
      success: function(data){
        $(".quote-area").html(data.quote);
        $(".author-area").html(data.author);
      },
      error: function(err){
        console.log(err);
      }
    });
  });

  $('#famous-quote').click(function(){
    $.ajax({
      url: "/",
      method: "POST",
      data: {quoteType: "famous"},
      success: function(data){
        $(".quote-area").html(data.quote);
        $(".author-area").html(data.author);
      },
      error: function(err){
        console.log(err);
      }
    });
  });
}); 

const backgroundMap = {
  1:"#FF3B3B",
  2: "#BF52FF",
  3: "#78FF52",
  4: "#FFFE52",
  5: "#FA892D"
};

function setBackground(){
    let rand = random(last);
    last = rand;
    $('body').css('background-color', backgroundMap[rand]);
}

function random(last){
  var rand = Math.floor(Math.random() * 5) + 1;
     if(rand === last){
    if (rand === 1){
      rand += 1;
    } else {
      rand -= 1;
    }
  }
  return rand;
}