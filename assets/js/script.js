// HangmanJS

var hardAnswers = ['interpoolation', 'compiler', 'isomorphic', 'transpiler', 'recursion', 'traversal', 
'javascript', 'jquery', 'atmospherejs', 'nodejs', 'vuejs', 'angularjs', 'reactjs', 'reactivexjs', 'scope', 'inheritance'];
var hardWord = hardAnswers[Math.floor(Math.random() * hardAnswers.length)];
var easyAnswers = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'purple', 'white', 'brown', 'teal', 'pink', 'grey', 'maroon', 'magenta'];
var easyWord = easyAnswers[Math.floor(Math.random() * easyAnswers.length)];
var guessList = "";
var guesses = document.getElementById('guess-list');
var lives = 10;
var lifeCount = document.getElementById('lives');
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
		// var lifeCount = document.getElementById('lives');
		// console.log(keyPress, 'guesses ' + guessList);

		
		
		if (letterArray.indexOf(keyPress) === -1){
			
			if (guessList.indexOf(keyPress) == -1){ 
				lives --;
				lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
				guessList += keyPress + ' ';
				guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
			} else{
				alert("You already guessed that letter!");
			}

		} else {

			for( var i = 0; i < letterArray.length; i++ ) {

				if ( keyPress === letterArray[i] ){
					document.getElementById(i).className = 'show';
				}

			}

		}
	}
}


const hangman = new Hangman("Hangman Game");

document.addEventListener("DOMContentLoaded", function(){

	var wordDifficultly;

	function difficultyLevel(id, wordDifficultly){

			function onetime(node, type, callback) {

				node.addEventListener(type, function(e) {

					e.target.removeEventListener(e.type, arguments.callee);

					return callback(e);
				});

			}

			function handleClick() {
				if ( id === 'easy') {
					wordDifficultly = easyWord;
					hangman.start(easyWord);
				} else {
					wordDifficultly = hardWord;
					hangman.start(hardWord);
				}

				// while (difficulty.firstChild) {
				// 	difficulty.removeChild(difficulty.firstChild);
				// }

				difficulty.classList.add('fade');

				lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
				guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
				document.querySelector('.image-container').style.display = 'block';
				document.getElementById('hangman-title').style.display = 'block';


				document.addEventListener("keypress", function(){

					hangman.handleKey(wordDifficultly);

				});
			}


			onetime(document.getElementById(id), 'click', handleClick);
	}

	difficultyLevel('easy', easyWord);
	difficultyLevel('hard', hardWord);




});//.ready