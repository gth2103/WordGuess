var gameWords = ["antelope", "salamander", "serval",  "caterpillars", "ocelot", "condor", "pheasant", "shoebill", "scorpion"]

var randomWord  = function(array) {
    var index = getRandomInt(9);
    return array[index];
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var isCorrectGuess = function(string,  char) {
    var containsChar = false;
    for(var i = 0; i < string.length; i++) {
        if(string[i] === char) {
           containsChar = true;
        }
    }
    return containsChar; 
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


