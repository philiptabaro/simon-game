var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  
function nextSequence() {

    //Resets the userClickedPattern every round
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //Picks a random new color and adds to the gamePatter Array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$( ".btn" ).click(function() {    

    //Gets the id of the button that the user clicked, which is the name of the color and pushes it to the array. 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 

    //Calls the checkAnswer function
    checkAnswer(userClickedPattern.length-1);


    //Plays the sound of the colour when the user clicks the button.
    playSound(userChosenColour);
    $(this).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    });
  });


//Function to play the sound of the button depending on its colour.
function playSound(name) {
    var sound = new Audio ("sounds/" + name + ".mp3");
    sound.play();
}

//Starts the game if "a" key is pressed.
$(document).keypress(function(event) {
    console.log(event);
    if (event.key === "a" && level === 0) {
        nextSequence();
        $("h1").text("Level 0");
    }
  });

//This function checks if the button clicked by the user corresponds to the gamePattern sequence. 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        //Checks if the user has selected all the level colours, then starts the next level.
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {

        //Game over if the user selected a wrong colour in the gamePattern.
        console.log("Wrong");
        setTimeout(function(){
            var sound2 = new Audio ("sounds/wrong.mp3");
            sound2.play();
        }, 500);
        

        $("body").addClass("game-over").delay(1000).queue(function(next){
            $(this).removeClass("game-over");
            next();
        });

        $("h1").text('Game over, press any key to RESTART');

        startOver();
    }
}

//Resets vars to start the game again.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    

    
}