alert("Warning!: You must be at least 18 years of age to enter");
var wins = 0;
var losses = 0;
var audioLoser = new Audio("assets/audio/lost1.mp3");
var audioWin = new Audio("assets/audio/win.mp3");
var audioWrong = new Audio("assets/audio/punch.mp3");
var audioCorrect = new Audio("assets/audio/toasty.mp3");
var noLetter = new Audio("assets/audio/error.mp3");
begin("");

// This starts off the game, and happens every time a new word is displayed
function begin (gameStart) {
  
var options = [ "BARAKA",
"CYRAX",
"ERMAC",
"FREDDY KRUEGER",
"GORO",
"JADE",
"JAX",
"JOHNNY CAGE",
"KABAL",
"KANO",
"KENSHI",
"KITANA",
"KRATOS",
"KUNG LAO",
"LIU KANG",
"MILEENA",
"NOOB SAIBOT",
"QUAN CHI",
"RAIDEN",
"RAIN",
"REPTILE",
"SCORPION",
"SEKTOR",
"SHANG TSUNG",
"SHEEVA",
"SINDEL",
"SKARLET",
"SMOKE",
"SONYA BLADE",
"SUB ZERO", ];

var secretWord = options[Math.floor(Math.random() * options.length)];
var l = secretWord.length;
var blankWord = [];
var blankWordStr = "";
var lettersGuessed = [];
var guesses = 10;
var win = 0;
var gameOver = 0;

// This function controls the user's guesses inside of the game
document.onkeyup = function(start) {
document.getElementById("outcome").innerHTML = "";
document.getElementById("outcomeAgain").innerHTML = "";
document.getElementById("userWins").src="";

// This loop creates the blank tiles (_) for the secretWord
for (var i = 0; i < l; i++) {

    if (secretWord.charAt(i) !== " ") {
        blankWord.push(" _ ");
    } else {
        blankWord.push(" \xa0\xa0\xa0\ ");
        win = (win + 1); }
    }
    
    // This converts the array into a string and replaces all , with a ""
    var blankWordString = blankWord.toString();
    var blankWordOnScreen = blankWordString.replace(/,/g , " ");

    // This will show the _ on screen so thr user knows how many letters are in the word
    document.getElementById("blankWordOnScreen").innerHTML = blankWordOnScreen;
    var lettersGuessed = "";


// This part is when the user presses a key.
document.onkeyup = function(event) {

    if (gameOver === 0) {

          var userGuess = event.key;
          userGuess = userGuess.toUpperCase();

          // This checks to make sure the user hasn't already guessed a letter.
        var inString = lettersGuessed.indexOf(userGuess);
        var alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var inAlphabet = alphabetStr.indexOf(userGuess);

            // This checks if the guess is in the secret word and makes sure the user enters a valid letter.
            if (inString < 0 && inAlphabet > -1) {

               lettersGuessed = (lettersGuessed + userGuess + " , ");

                  // This is verifying the user has enough guesses remaining to continue the game.
                  // Guesses start at 10.
                  if (guesses > 1) {
                      
                      // This section will verify if the user guessed any correct letters and replace them
                    // in the blank word.  Running the for loop, b/c the same letter may happen in more than 1 place.
                      for (j = 0; j < l; j++) {
                          
                          // This runs the if/else loop so I can add letters and _'s to the new array.
                          if (userGuess === secretWord.charAt(j)) {

                              document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
                               
                                   // l is # of letters, k is new variable for counting.
                                   // This will add _'s and letters to the array.
                                   if (userGuess === secretWord.charAt(j)) {
                                       blankWord[j] = userGuess;
                                       win = (win + 1);
                                   }

                                else {}
                                   
                                   // This changes the array into a string and removes all ,
                                   var blankWordString = blankWord.toString();
                                var blankWordOnScreen = blankWordString.replace(/,/g , " ");

                            // This writes to the HTML the word with _ and letters guessed correctly in the word
                              document.getElementById("blankWordOnScreen").innerHTML = blankWordOnScreen;
                            
                            // This plays the correct guess sound if the word isn't completely guessed.
                            // If it is completely guessed, another sound will play.
                            if (secretWord.length !== win) { audioCorrect.play();
                            } else {}
                          }

                        // This writes on the HTML the letter they guessed (since it wasn't in the secret word)
                          else { document.getElementById("lettersGuessed").innerHTML = lettersGuessed; }	

                      }

                      // If the user guesses all letters, then the userWins function is run.
                      if (secretWord.length === win) {
                          userWins();
                          begin("yes"); }

                    // If the user guesses a correct letter, then no guesses are used.
                    if (secretWord.includes(userGuess)) {

                    } else { guesses--;
                           audioWrong.play();
                    }
                      document.getElementById("guesses").innerHTML = guesses;
                }

                  // If the user is out of guesses, the game will end
                  else {   userLosses(); 
                }

            }

        // If the user does not enter a letter, this sound will play
        else { noLetter.play();
        }
    
    }

}

}

// This function runs when the user does not correctly guess the secret word and all guessed have
// been used.  The game is reset for another word if the user wants to play again.
function userLosses() {
guesses--;
losses++;
audioLoser.play();
document.getElementById("losses").innerHTML = losses;
document.getElementById("guesses").innerHTML = guesses;
document.getElementById("outcome").innerHTML = ("FATALITY! YOUR SOUL IS MINE! The secret word was " + secretWord);
document.getElementById("outcomeAgain").innerHTML = "TEST YOUR MIGHT! Press any key to try again";
document.getElementById("lettersGuessed").innerHTML = " ";
document.getElementById("userWins").src="assets/images/loss3.gif";
guesses = 10;
document.getElementById("guesses").innerHTML = guesses;
begin("yes");
}

// This function runs if the user guesses the secret word. Variables are reset for the next word,
// and a picture shows of the correctly guessed character.
function userWins() {
wins++;
audioWin.play();
document.getElementById("wins").innerHTML = wins;
document.getElementById("outcome").innerHTML = "PLAYER WINS! SUPERB! HANGMAN VICTORY!";
document.getElementById("outcomeAgain").innerHTML = "TEST YOUR MIGHT! Press any key to play agian";
gameOver = 1;
document.getElementById("lettersGuessed").innerHTML = " ";
guesses = 10;
document.getElementById("guesses").innerHTML = guesses;

// This shows the picture if the user guesses the correct secret word
var word = { 
    "BARAKA": "assets/images/baraka.jpg",
    "CYRAX": "assets/images/cyrax.jpg",
    "ERMAC": "assets/images/ermac.jpg",
    "FREDDY KRUEGER": "assets/images/FreddyKrueger.jpg",
    "GORO": "assets/images/goro.jpg",
    "JADE": "assets/images/jade.png",
    "JAX": "assets/images/jax.jpg",
    "JOHNNY CAGE": "assets/images/johnny-cage.png",
    "KABAL": "assets/images/kabal.png",
    "KANO": "assets/images/Kano.jpg",
    "KENSHI": "assets/images/kenshi.jpg",
    "KITANA": "assets/images/Kitana.png",
    "KRATOS": "assets/images/kratos.jpg",
    "KUNG LAO": "assets/images/KungLao.jpg",
    "LIU KANG": "assets/images/liukang.jpg",
    "MILEENA": "assets/images/mileena.png",
    "NOOB SAIBOT": "assets/images/noob-saibot.jpg",
    "QUAN CHI": "assets/images/quan-chi.png",
    "RAIDEN": "assets/images/raiden.png",
    "RAIN": "assets/images/rain.png",
    "REPTILE": "assets/images/reptile.png",
    "SCORPION": "assets/images/Scorpion.jpg",
    "SEKTOR": "assets/images/sektor.jpg",
    "SHANG TSUNG": "assets/images/shang-tsung.png",
    "SHEEVA": "assets/images/sheeva.jpg",
    "SINDEL": "assets/images/sindel.png",
    "SKARLET": "assets/images/skarlet.png",
    "SMOKE": "assets/images/smoke.png",
    "SONYA BLADE": "assets/images/sonya-blade.jpg",
    "SUB ZERO": "assets/images/subzero.jpg",

};

document.getElementById("userWins").src = word[secretWord];

 }

}

