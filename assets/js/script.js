// HangmanJS

var hardAnswers = ['interpoolation', 'compiler', 'isomorphic', 'transpiler', 'recursion', 'traversal', 
'javascript', 'jquery', 'atmospherejs', 'nodejs', 'vuejs', 'angularjs', 'reactjs', 'reactivexjs', 'scope', 'inheritance'];
var hardWord = hardAnswers[Math.floor(Math.random() * hardAnswers.length)];
var easyAnswers = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'purple', 'white', 'brown', 'teal', 'pink', 'grey', 'maroon', 'magenta'];
var easyWord = easyAnswers[Math.floor(Math.random() * easyAnswers.length)];
var guessList = "";
var guesses = document.getElementById('guess-list');
var lives = 6;
var lifeCount = document.getElementById('lives');
var correct = 0;
var main = document.getElementById('main');
var difficulty = document.getElementById('difficulty');

class Hangman {

	start(letterArray) {

		for( var i = 0; i < letterArray.length; i++ ) {

			main.innerHTML = main.innerHTML + '<div class="letterbox">' + '<span id=' + i + ' class="hidden">' + letterArray[i] + '</span>' + '</div>';

			console.log(letterArray[i]);

		}
	}

	handleKey(letterArray) {

		var keyPress = event.key.toLowerCase();

		if (event.keyCode < 65 || event.keyCode > 90) {
			 alert('Not a valid key!');
		} else {

			if (letterArray.indexOf(keyPress) === -1){
				
				if (guessList.indexOf(keyPress) === -1){ 
					lives --;
					lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
					guessList += keyPress + ' ';
					guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
				} else{
					if (lives !== 0) alert("You already guessed that letter!");
				}

			} else {

				for( var i = 0; i < letterArray.length; i++ ) {

					if ( keyPress === letterArray[i] ){
						document.getElementById(i).className = 'show';
						correct++;
						if ( correct === letterArray.length) {

							setTimeout( function() {
								alert("You've won, absolutely fantastic!!!");
							}, 1000);

						}
					}

				}

			}
			if (lives === 0) {
				if (confirm('You ran out of lives :( - Do you want to play again?')) location.reload();
				else {
					lifeCount.innerHTML = '<p>Lives: :( </p>';
				}
			}
		}
	}
}


const hangman = new Hangman("Hangman Game");

document.addEventListener("DOMContentLoaded", function(){

    AOS.init({
      offset: 0,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });

	var wordDifficultly;

	function difficultyLevel(id, wordDifficultly){

			function onetime(node, type, callback) {

				node.addEventListener(type, function(e) {

					e.target.removeEventListener(e.type, arguments.callee);

					return callback(e);
				});

			}

			function handleClick() {

				console.log(document.getElementsByClassName('hidden'));

				if ( id === 'easy') {
					wordDifficultly = easyWord;
					hangman.start(easyWord);
				} else {
					wordDifficultly = hardWord;
					hangman.start(hardWord);
				}

				difficulty.style.display = 'none';

				lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
				guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
				document.querySelector('.image-container').style.display = 'block';
				document.getElementById('hangman-title').style.display = 'block';


				document.addEventListener("keyup", function(){

					hangman.handleKey(wordDifficultly);

				});
			}


			onetime(document.getElementById(id), 'click', handleClick);
	}

	difficultyLevel('easy', easyWord);
	difficultyLevel('hard', hardWord);




});//.ready