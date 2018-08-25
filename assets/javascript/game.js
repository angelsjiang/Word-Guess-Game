/* every input of word, show on Wrong Guesses if wrong,
   or replace one or more of the dash(es) if correct,
   Guesses left minus 1 each time,
*/

// bunch of variables

// create a function that you can press any key to start
// create a function to store user input
// need to be careful if user press Enter key or Shift key, might need to eliminate those cases
// how to create a random generator to associate number with an answer
// and being able to ?????

var wins = document.getElementById("win-counter");
wins = 0;
var losses = document.getElementById("loss-counter");
losses = 0;

function hangmanGame(word) {
    
    // declare outside, or it'll be redeclared each time pressing key

    var currCorrAns = [];
    var currGuess = [];    
    var wrongGuesses =[];
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses;
    var chancesLeft = 9;
    document.getElementById("guesses-left").innerHTML = chancesLeft;
    document.getElementById("initiateGame").innerHTML = "Begin!";
    var youWin = false;
    
    // setting the value of correct answer, updating guessing section
    for(var i = 0; i < word.length; i++) {
        currGuess.push('_');
        currCorrAns.push(null);
        currCorrAns[i] = word[i];
    }
    
    document.getElementById("word-blanks").innerHTML = currGuess.join(" ");

    document.onkeyup = function (key) {
        currCorrAns = word;
        
        var userInput = event.key;
        var match = false;

        // check through if userInput match with anything in currCorrAns[]
        // make a loop to check if userInput exists in wrongGuesses[]
        for (var i = 0; i < currCorrAns.length; i++) {
            if (userInput === currCorrAns[i]) {
                match = true;
                userInput.toLowerCase();
                // console.log(currGuess + "before");
                currGuess[i] = userInput;

                // console.log(currGuess + "after");
                document.getElementById("word-blanks").innerHTML = currGuess.join(" ");
            }
        }
        if (match) {

            if(checkIfComplete(currGuess,currCorrAns)) {
                
                document.onkeyup = function(key) {
                    winsCounter();
                    newGame();
                }
            }
            else {
                if (chancesLeft > 0) {
                    chancesLeft = chancesLeft - 1;
                    document.getElementById("guesses-left").innerHTML = chancesLeft;
    
                }
                else {
                    // gameCanBegin = false;
                    document.getElementById("initiateGame").innerHTML = "YOU LOSE!";
                    lossesCounter();
                    newGame();
                }
            }



        }


        // if the word doesn't match, it should go through this if statement
        if (!match) {
            console.log(currGuess + "before wrongGuesses for loop");
            // go through the loop, if found same letter, change value of counter
            var counter = false;
            for (var i = 0; i < wrongGuesses.length; i++) {
                if (userInput === wrongGuesses[i]) {
                    counter = true;
                }

                console.log(userInput + " hello");
            }

            // if counter value is changed, should go through this one
            if (!counter) {
                userInput.toLowerCase();
                wrongGuesses.push(userInput);
            }

            // Check if current guess is complete


            // update "Guesses Left" section
            console.log(chancesLeft + "after");
            if (chancesLeft > 0) {
                chancesLeft = chancesLeft - 1;
                document.getElementById("guesses-left").innerHTML = chancesLeft;
                console.log(wrongGuesses);
                document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
            }
            else {
                document.getElementById("initiateGame").innerHTML = "YOU LOSE!";
                lossesCounter();
                newGame();
            }
        
        }
    }
}

function checkIfComplete(array1, array2) {
    if(array1.toString() === array2.toString()) {
        return true;
    }
}

// create a function to accumulate times of Wins
function winsCounter() {
    wins = wins + 1;
    wins = document.getElementById("win-counter").innerHTML = wins;
}

// create a function to accumulate times of Losses
function lossesCounter() {
    losses = losses + 1;
    document.getElementById("loss-counter").innerHTML = losses;
}

// create a function to decrease chances left each round of game

// create an document.onkeyup = function(event) {} to listen
// to the user input

// Create an array of wrong guesses, use .push() to add onto the array

// create a reset button

function newGame() {
    var monopoly = ['m', 'o', 'n', 'o', 'p', 'o', 'l', 'y'];
    var jenga = ['j', 'e', 'n', 'g', 'a'];
    var avalon = ['a','v','a','l','o','n'];
    var battleship = ['b','a','t','t','l','e','s','h','i','p'];
    var possWords = [jenga, avalon, monopoly, battleship];
    var j = Math.floor(Math.random() * 4);
    
    hangmanGame(possWords[j]);
    // changeHeaderDes.textContent = "Begin!";
    // wrongGuesses = [];
    // document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    
    // // this one should randomlt choose the next word
    // currGuess = ['_','_','_','_','_','_','_'];
    // document.getElementById("word-blanks").innerHTML = currGuess.join(" ");
}