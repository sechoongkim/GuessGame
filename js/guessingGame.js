/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    playersGuessHistory = [];

/* **** Guessing Game Functions **** */

function shuffle (a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}

// Generate the Winning Number

function generateWinningNumber(){
    // add code here
    winningNumber = Math.floor(Math.random() * 100) + 1;
    return winningNumber;
}

// Fetch the Players Guess

function playersGuessSubmission(){
    // add code here
    var value = $('input[name="guess"]').val();
    playersGuess = value;
    playersGuessHistory.push(playersGuess);
    $('input[name="guess"]').val('');
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
    // add code here
    var message = '';
    var abs = Math.abs(playersGuess - winningNumber);
    var digit = '';

    if (abs < 5) {
        digit = '5';
    }
    else if (abs < 10) {
        digit = '10';
    }
    else {
        digit = '20';
    }

    if (winningNumber < playersGuess) {
        message = 'Your guess is higher and within ' + digit + ' digits of the winning number';
    }
    else {
        message = 'Your guess is lower and within ' + digit + ' digits of the winning number';
    }

    guessMessage(message);
}

function guessMessage(message) {
    // add code here
    $('#guess-message').text(message);
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
    // add code here
    if (winningNumber == playersGuess) {
        return true;
    }
    else {
        return false;
    }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
    
    var guessCount = 5-playersGuessHistory.length;
    var possible = []; 
    possible.push(winningNumber); 
    
    if (guessCount == 4){
        for (i = 0; i < 7; i++){
           var val= Math.floor(Math.random() * 100) + 1;
           possible.push(val);   
        }
        $('#notification').text("One of these values is the winning number [" + shuffle(possible) + "] submit a guess");
    }
    if (guessCount == 3){
        for (i = 0; i < 5; i++){
           var val= Math.floor(Math.random() * 100) + 1;
           possible.push(val);   
        }
        $('#notification').text("One of these values is the winning number [" + shuffle(possible) + "] submit a guess");
    }   
    if (guessCount == 2){
        for (i = 0; i < 3; i++){
           var val= Math.floor(Math.random() * 100) + 1;
           possible.push(val);   
        }
        $('#notification').text("One of these values is the winning number [" + shuffle(possible) + " ] submit a guess");
    }
    if (guessCount == 1){
        for (i = 0; i < 1; i++){
           var val= Math.floor(Math.random() * 100) + 1;
           possible.push(val);   
        }

        $('#notification').text("One of these values is the winning number [" + shuffle(possible) + "] submit a guess");
    }
    
}

// Allow the "Player" to Play Again

function playAgain(){
	alert("dick");
    playersGuessHistory = [];
    generateWinningNumber();
   
    
    
$('#btn-again').on('click', function () {
    playAgain();
});


$('#btn-submit').on('click', function () {
    playersGuessSubmission();
    var isSuccess = checkGuess();

    if (isSuccess) {
        $('#notification').text('Player wins!');
        guessMessage('');
    }
    else {
        $('#notification').text('Try Again!');
        lowerOrHigher();
    }
});

$('#btn-hint').on('click',function (){
    
    provideHint();
});

}



/* **** Event Listeners/Handlers ****  */

$('#btn-again').on('click', function () {
    playAgain();
});

$('#btn-submit').on('click', function () {
    playersGuessSubmission();
    var isSuccess = checkGuess();

    if (isSuccess) {
        $('#notification').text('Player wins!');
        guessMessage('');
        var audio = new Audio('The Rock(freshmp3songs.com).mp3');
        audio.play();
    }

    else {
        $('#notification').text('Try Again!');
        lowerOrHigher();
    }
});

$(document).keypress(function(e) {
    if(e.which == 13) {
         playersGuessSubmission();
         var isSuccess = checkGuess();

    if (isSuccess) {
        $('#notification').text('Player wins!');
        guessMessage('');
        var audio = new Audio('The Rock(freshmp3songs.com).mp3');
        audio.play();
    }

    else {
        $('#notification').text('Try Again!');
        lowerOrHigher();
    }

    }
});

$('#btn-hint').on('click',function (){
    
    provideHint();
    

});

generateWinningNumber();
