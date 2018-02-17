//Set up buttons
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

for (var i = 0; i < alphabet.length; i++) {

    var $letterBtn = $("<button>")
        .addClass("letter-button")
        .attr("data-letter", alphabet[i])
        .html(alphabet[i]);

    $("#letter-options").append($letterBtn);
}

// Create array of possible word choices 
var wordChoices = ["CAT", "DOG", "MOUSE"];
var word = "";
var wordArray = [];
var userWord = "";
var userWordArray = [];
// Create array for letters guessed (incorrectly)
var lettersGuessed = [];
// Start counting guesses remaining
var guessesRemaining
// Tracking Wins/Loses
var win = 0;
var lose = 0;

// Rest game and pick a random word from the array and assign it as the one trying to be guessed
function newWord() {
    reset();
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];

    // //Turn this word into an array of letters
    wordArray = word.split("");
    console.log(wordArray);
    //Display the # of blanks in the word
    for (var i = 0; i < wordArray.length; i++) {
        userWordArray.push(" _ ");
    }
    $("#userWord").html(userWordArray);
}
// Reset for next game
function reset() {
    word = "";
    wordArray = [];
    userWord = "";
    userWordArray = [];
    lettersGuessed = [];
    guessesRemaining = 6;
}
// Check to see if letter guessed has been guessed before
function checkGuessedBefore(userGuess) {
    guessed = false;
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alert("Letter " + lettersGuessed[i] + " has already been guessed. Guess another letter.");
            guessed = true;
            return;
        }
    }
    for (i = 0; i < userWordArray.length; i++) {
        if (userGuess === userWordArray[i]) {
            alert("Letter " + userWordArray[i] + " has already been guessed correctly.");
            guessed = true;
            return;
        }
    }
}

// Check to see if the letter is correct or incorrect
function checkGuess(userGuess) {
    var gotOne = false;
    for (i = 0; i < wordArray.length; i++) {
        // If correct, display where that letter appears
        if (userGuess === wordArray[i]) {
            userWordArray.splice(i, 1, userGuess);
            $("#userWord").html(userWordArray);
            gotOne = true;
        }
    }
    // If wrong, -1 for guesses remaining, add the letter to letters guessed, and then draw part of hangman
    if (gotOne === false) {
        guessesRemaining -= 1;
        console.log("guessesRemaining " + guessesRemaining);
        lettersGuessed.push(userGuess);
        $("#letters-guessed").append(userGuess);
        drawHangman(guessesRemaining);
    }
}
//Drawing the hangman
function drawHangman(guessesRemaining) {
    var $canvas = $(canvas);

    if (guessesRemaining === 5) {
        //left leg
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 25, y1: 25,
            x2: 50, y2: 75,
        });
    }
    if (guessesRemaining === 4) {
        //right leg
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 75, y1: 25,
            x2: 50, y2: 75,
        });
    }
    if (guessesRemaining === 3) {
        //body
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 75,
            x2: 50, y2: 150,
        });
    }
    if (guessesRemaining === 2) {
        //left arm
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 125,
            x2: 25, y2: 150,
        });
    }
    if (guessesRemaining === 1) {
        //right arm
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 125,
            x2: 75, y2: 150,
        });
    }
    if (guessesRemaining === 0) {
        //head
        $canvas.drawArc({
            strokeStyle: "black",
            strokeWidth: 4,
            x: 50, y: 175,
            radius: 25,
        })
            //left eye
            .drawArc({
                fillStyle: "black",
                strokeStyle: "black",
                x: 40, y: 180,
                radius: 2,
            })
            //right eye
            .drawArc({
                fillStyle: "black",
                strokeStyle: "black",
                x: 60, y: 180,
                radius: 2,
            })
            //mouth
            .drawArc({
                strokeStyle: "black",
                strokeWidth: 2,
                x: 50, y: 165,
                radius: 5,
            });
    }
    else if (guessesRemaining === 5) {

    }
}

//check to see if user has won or lost and track win/loss
function checkStatus() {
    userWord = userWordArray.join("");
    console.log(userWord);
    if (userWord === word) {
        setTimeout(function () {
            alert("You win, Liberacorpus!");
            win += 1;
            $("#wins").html("Wins: " + win);
            newWord();
        }, 50);
    }
    else if (guessesRemaining === 0) {
        alert("You lose, Levicorpus! The word was " + word + ".");
        lose += 1;
        $("#losses").html("Losses: " + lose);
        newWord()
    }
}


$(document).ready(function () {
    newWord();
});

//User will press a key to guess a letter
document.onkeyup = function (event) {
    // Capture the key typed and convert to upper case
    var userGuess = event.key.toUpperCase();
    checkGuessedBefore(userGuess);
    if (guessed === false) {
        checkGuess(userGuess);
        checkStatus();
    }
}



