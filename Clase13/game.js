
var color = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userPattern = [];

var level = 0;

$("button").click(function () {
  var userColorChosen = $(this).attr("id");
  userPattern.push(userColorChosen);
  var audio = new Audio("sounds/" + userColorChosen + ".mp3");
  audio.play();
  $("#" + userColorChosen)
    .fadeOut(100)
    .fadeIn(100);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    $("h1").text("GAMEOVER");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("gameover");
    setTimeout(function () {
      $("body").removeClass("gameover");
    }, 100);
    startOver();
  }
}

function newSequence() {
  userPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var colorChosen = color[randomNumber];
  gamePattern.push(colorChosen);
  var audio = new Audio("sounds/" + colorChosen + ".mp3");
  audio.play();
  $("#" + colorChosen)
    .fadeOut(250)
    .fadeIn(250);
}

var call = true;
$(document).keypress(function () {
  if (call === true) {
    newSequence();
    call = false;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  call = true;
}


