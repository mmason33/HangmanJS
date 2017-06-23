// HangmanJS

var hardAnswers = ['one', 'two', 'three', 'four', 'five'];
var hardWord = hardAnswers[Math.floor(Math.random() * hardAnswers.length)];
var easyAnswers = ["red", "blue", "orange", "purple", "yellow"];
var easyWord = easyAnswers[Math.floor(Math.random() * easyAnswers.length)];
var guessList = "";
var lives = 10;
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
		console.log(keyPress);
		console.log(letterArray.indexOf(keyPress) === -1);
		console.log(guessList.indexOf(keyPress) === -1);
		
		
		if (letterArray.indexOf(keyPress) === -1){
			
			if (guessList.indexOf(keyPress) == -1){ 
				lives --;
				guessList += keyPress + ' ';
			} else{
				alert("you already guessed that letter!");
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

				while (difficulty.firstChild) {
					difficulty.removeChild(difficulty.firstChild);
				}

				document.addEventListener("keypress", function(){

					hangman.handleKey(wordDifficultly);

				});
			}


			onetime(document.getElementById(id), 'click', handleClick);
	}

	difficultyLevel('easy', easyWord);
	difficultyLevel('hard', hardWord);




});//.ready