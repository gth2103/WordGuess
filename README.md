# Word Guess Game (Browser)

A web-based Word Guess game (also known as hangman)

## Overview

<!-- TODO: add a description of your assignment, theme, approach, and solution here -->

Build the game logic

The game was built by first implementing a set of utility functions to be used in each iteration.

These include:

Picking a random word - randomWord function

Checking if a letter is in a word - isCorrectGuess function

Building the initial "blanks" array (what the user will see) - getBlanks function

Filling in "blanks" - fillBlanks function


A seperate set of fucntions were, then, implemented to manage the game state over the course of several iterations. 

These include: 

Set up a new "round" (current word, guesses left, wrong guesses, puzzle state) - setupRound function

Update the "round" with a newly guessed letter - updateRound function

Check if the user has won the "round" - hasWon function

Check if the user has lost the "round" - hasLost function

Check if the "round" is over (won or loss) - isEndOfRound function

Set up the "game" (wins, losses, words array, current round) - setupGame function

Update the "game" with a new round (and alert that the round is over) - startNewRound function


Build webpage

A webpage was built containing elements to show the  relevent game information, including:

puzzle state (current representation of the word, with blanks and filled in letters)
wins (# times user has guessed word correctly before running out of guesses)
losses (# times user has failed to guess the word before running out of guesses)
letters (incorrect letters guessed this round so far), and
guesses left (number of incorrect guesses left)


The elements were given the following ids:

puzzle-state
wrong-guesses
guesses-left
win-counter
loss-counter

The page was styled using html, css and bootstrap. The page was dynamically updated using javascript.
The theme of the page was 'animals' and the page was customized accordingly. 

Javascript event listeners were used to detect user input via keydown events, and the page was updated based on the key pressed. At each keydown event the page is uploaded, and at the end of the round the user is alerted as to the status of the game and his or her performance. The page is updated with the image of the animal from the completed round, and the name of the animal is displayed below the banner. A sound is played when the user is successful. 

Handle user input and update the page


## Functionality Breakdown
[Screenshot of Game](images/screenshot1.mp4)

