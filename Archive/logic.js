var gameWords = ["antelope", "salamander", "serval",  "caterpillars", "ocelot", "condor", "pheasant", "shoebill", "scorpion"]

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
        alert("Congratulations, you won! The correct word was '" + game.round.word + "'. Play again!");
        game.wins++;
    }
    else if(hasLost(game.round.guessesLeft)){
        alert("Sorry, you lost! The correct word was '" + game.round.word + "'. Try again!");
        game.losses++;
    }
    game.round  = setupRound(randomWord(array));
}

var myGame = setupGame(gameWords, 0, 0);
