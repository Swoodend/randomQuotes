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
      url: movieUrl,
      headers: {
       "X-Mashape-Key": 'qtmx9JW3eZmshXVDmrUgCxrwMAmnp1JJCGmjsnwdDJBSsgeCbp',
       "Content-Type": "application/x-www-form-urlencoded",
       "Accept": "application/json"        
      },
      success: function(data){
        let quoteObj = jQuery.parseJSON(data);
        $(".quote-area").html(quoteObj.quote);
        $(".author-area").html(quoteObj.author);
      }
    });
  });

    $('#famous-quote').click(function(){
    $.ajax({
      url: famousUrl,
      headers: {
       "X-Mashape-Key": 'qtmx9JW3eZmshXVDmrUgCxrwMAmnp1JJCGmjsnwdDJBSsgeCbp',
       "Content-Type": "application/x-www-form-urlencoded",
       "Accept": "application/json"        
      },
      success: function(data){
        let quoteObj = jQuery.parseJSON(data);
        $(".quote-area").html(quoteObj.quote);
        $(".author-area").html(quoteObj.author);
      }
    });
  });

  $()
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