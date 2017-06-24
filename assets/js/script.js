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
var alert = document.getElementById('alert');

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
				alert.textContent = 'Not a valid key!';
				setTimeout( function(){
					alert.textContent = '';
				}, 2000);
		} else {
			if (document.getElementsByClassName('show').length !== letterArray.length) {

				if ( letterArray.indexOf(keyPress) === -1 ) {
					
					if ( guessList.indexOf(keyPress) === -1 ) { 
						lives --;
						lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
						guessList += keyPress + ' ';
						guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
					} else{
						if (lives !== 0) {
							alert.textContent = 'You already guessed that letter!';
							setTimeout( function(){
								alert.textContent = '';
							}, 2000);
						}
					}

				} else {

					for( var i = 0; i < letterArray.length; i++ ) {

						if ( keyPress === letterArray[i] ){
							document.getElementById(i).className = 'show';
							correct++;
							if ( correct === letterArray.length) {

								alert.innerHTML = "You've won, absolutely fantastic!!!<br>Type y to play again!";

								document.addEventListener('keyup', function(e) {

									if ( e.key === 'y') location.reload();

								});
								
							}
						}

					}

				}
				if (lives === 0) {

					alert.innerHTML = 'You ran out of lives :( - Do you want to play again? <br><strong>Type y for yes.';

					document.addEventListener( 'keyup', function(e){

						if ( e.key.toLowerCase() === 'y') {
							location.reload();
						}

					});
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

			}//end ontime();

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
			}//end handleClick();

			onetime(document.getElementById(id), 'click', handleClick);

	}//end difficultyLevel();

	difficultyLevel('easy', easyWord);
	difficultyLevel('hard', hardWord);

});//.ready