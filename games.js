var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startOver() {
  gamePattern = [];
  userClickedPattern = [];

  started = false;
  level = 0;
}

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  animateButton(randomColor);
}

$(".btn").on("click", function() {

  var buttonClicked = this.getAttribute("id");
  userClickedPattern.push(buttonClicked);

  playSound(buttonClicked);
  animateButton(buttonClicked);

  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}
