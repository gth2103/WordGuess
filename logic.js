var gameWords = ["antelope", "salamander", "serval",  "caterpillar", "ocelot", "condor", "pheasant", "shoebill", "scorpion"]
var audio = new Audio('./sound/lionSleeps.mp3');

var randomWord  = function(array) {
    var index = getRandomInt(9);
    return array[index];
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var isCorrectGuess = function(string,  char) {
    for(var i = 0; i < string.length; i++) {
        if(string[i] === char) {
           return true;
        }
    }
    return false; 
}

var getBlanks = function(string) {
    var blanks = [];
    for(var i  = 0;  i < string.length; i++) {
        blanks.push("_");
    }
    return blanks;
}

var fillBlanks = function(string, state, char) {
    var indices = getIndices(string, char);
    for(var i = 0; i < indices.length; i++){
        state.splice(indices[i], 1, char);
    }
return state;
}

var getIndices = function(string, char) {
    var indices = [];
    for(var i = 0; i < string.length; i++) {
        if(string[i] === char) {
        indices.push(i);
        }
    }
    return indices;
}

var setupRound = function(string) {
    var round = {
        word : string,
        guessesLeft : 9,
        wrongGuesses : [],
        puzzleState : getBlanks(string)
    }
    return round;
}

var updateRound = function(round, char) {
    if(!(isCorrectGuess(round.word, char) || isCorrectGuess(round.puzzleState, char) || isCorrectGuess(round.wrongGuesses, char))){
        round.guessesLeft--;
        round.wrongGuesses.push(char);
    }
    else if (isCorrectGuess(round.word, char) && !isCorrectGuess(round.puzzleState, char)) {
        round.puzzleState = fillBlanks(round.word, round.puzzleState, char);
    }
}

var hasWon = function(array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] === "_") {
            return false;
        }
    }
    return true;
}

var hasLost = function(integer) {
    if(integer === 0) {
        return true;
    }
    return false;
}

var isEndOfRound = function(round) {
    if(hasWon(round.puzzleState) || hasLost(round.guessesLeft)) {
        return true;
    }
    return false;
}

var setupGame = function(array, integerW, integerL) {
    var game = {
        words: array,
        wins: integerW,
        losses: integerL,
        round: setupRound(randomWord(array))
    }
    return game;
}

var startNewRound = function(game){
    if(hasWon(game.round.puzzleState)){
        audio.play()
        alert("Congratulations, you won! The correct word was '" + game.round.word + "'. Play again!");
        game.wins++;
    }
    else if(hasLost(game.round.guessesLeft)){
        alert("Sorry, you lost! The correct word was '" + game.round.word + "'. Try again!");
        game.losses++;
    }
    game.round  = setupRound(randomWord(game.words));
}

var myGame = setupGame(gameWords, 0, 0);

var putRandomImage = function() {
    var elem = document.getElementById('animal-img');
    var img =  document.createElement('img');
    var src = document.createAttribute('src');
    var string = "./images/animals/animal-" + getRandomInt(12) + ".png"
    src.value = string;
    var id = document.createAttribute('id');
    var string = "animal"
    id.value = string;
    img.setAttributeNode(id);
    img.setAttributeNode(src);
    elem.appendChild(img);
}

var putCorrectImage = function() {
    var elem = document.getElementById('animal-img');
    var img =  document.createElement('img');
    var src = document.createAttribute('src');
    var string = "./images/animals/" + myGame.round.word + ".png"
    src.value = string;
    var id = document.createAttribute('id');
    var string = "animal"
    id.value = string;
    img.setAttributeNode(id);
    img.setAttributeNode(src);
    elem.appendChild(img);
}

var pullImage = function() {
    var child = document.getElementById("animal");
    var parent = document.getElementById('animal-img');
    parent.removeChild(child)
}

var putLosses = function() {
    var elem = document.getElementById('loss-counter');
    var lossCounterString = 'Losses<br>' + myGame.losses;
    elem.innerHTML = lossCounterString;
}

var putWins = function() {
    var elem = document.getElementById('win-counter');
    var winCounterString = 'Wins<br>' + myGame.wins;
    elem.innerHTML = winCounterString;
}

var putGuessesLeft = function() {
    var elem = document.getElementById('guesses-left');
    var guessesLeftString = 'Number of guesses remaining<br>' + myGame.round.guessesLeft;
    elem.innerHTML = guessesLeftString;
}

var getPuzzleState  = function(){

    var puzzleStateString = ""

    for(var i = 0; i < myGame.round.puzzleState.length; i++){
        puzzleStateString = puzzleStateString + myGame.round.puzzleState[i] + " ";
    }
    return puzzleStateString;
}

var putPuzzleState = function() {
    var elem = document.getElementById('puzzle-state');
    var puzzleStateString = 'Current Word<br>' + getPuzzleState();
    elem.innerHTML = puzzleStateString;
}

var getWrongGuesses  = function(){

    var wrongGuessesString = ""

    for(var i = 0; i < myGame.round.wrongGuesses.length; i++){
        wrongGuessesString = wrongGuessesString + myGame.round.wrongGuesses[i] + " ";
    }
    return wrongGuessesString;
}

var putWrongGuesses = function() {
    var elem = document.getElementById('wrong-guesses');
    var wrongGuessesString = 'Letters already guessed<br>' + getWrongGuesses();
    elem.innerHTML = wrongGuessesString;
}

var getLetter = function(e) {
    if(e.keyCode >= 65  && e.keyCode <= 90) {
        var letter = String.fromCharCode(e.keyCode).toLowerCase();
        return letter; 
    }
}


var getStart = function(e) {
    if(e.keyCode === 32) {
        return true; 
    }
    return false;
}

var putCorrectGuess = function() {
    var elem = document.getElementById('correct-guess');
    var correctGuessString = myGame.round.word;
    elem.innerHTML = correctGuessString;
}

var updatePage  =  function() {
    putPuzzleState();
    putWins();
    putLosses();
    putGuessesLeft();
    putWrongGuesses();
}


window.addEventListener('DOMContentLoaded', (event) => {

    putRandomImage();
    updatePage();


    document.addEventListener('keydown', (event) => {
             
   
            if(isEndOfRound(myGame.round)) {
                start = false;
                putCorrectGuess();
                pullImage();
                putCorrectImage();
                startNewRound(myGame);
                updatePage();
            }
            else {
                var letter =  getLetter(event)
                if(letter) {
                    updateRound(myGame.round, letter);
                    updatePage();
                }
            }
    });

});
