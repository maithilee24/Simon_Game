var gamepattern = [];
var userClickedpattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;

$(document).keypress(function (){
    if(!started)
    {
        $("#level-title").text("level "+ level);
        nextSequence();
        started= true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    Checkanswer(userClickedpattern.length-1);
});

function Checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userClickedpattern[currentlevel]){
        console.log("success");
        if(gamepattern.length===userClickedpattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
        else{
            console.log("wrong");
            playsound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game over,Press any key to restart");
            startover();
        }
}

function nextSequence(){
    userClickedpattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomnumber = Math.floor(Math.random()*10);
    var randomChosenColor = buttonColors[randomnumber];
    gamepattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    } , 100);
}
function startover(){
    level=0;
    gamepattern=[];
    started=false;
}





