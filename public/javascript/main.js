'use strict';
let last;

$(document).ready(function(){
  $('body').click(function(){
    setBackground();
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