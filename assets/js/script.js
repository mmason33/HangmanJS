// HangmanJS

class Hangman {
	constructor() {

		let hardAnswers = ['interpoolation', 'compiler', 'isomorphic', 'transpiler', 'recursion', 'traversal', 
		'javascript', 'jquery', 'atmospherejs', 'nodejs', 'vuejs', 'angularjs', 'reactjs', 'reactivexjs', 'scope', 'inheritance'];
		let hardWord = hardAnswers[Math.floor(Math.random() * hardAnswers.length)];
		let easyAnswers = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'purple', 'white', 'brown', 'teal', 'pink', 'grey', 'maroon', 'magenta'];
		let easyWord = easyAnswers[Math.floor(Math.random() * easyAnswers.length)];
		let guessList = "";
		let guesses = document.getElementById('guess-list');
		let lives = 6;
		let lifeCount = document.getElementById('lives');
		let correct;
		let main = document.getElementById('main');
		let difficulty = document.getElementById('difficulty');
		let alert = document.getElementById('alert');
		let wordDifficultly;		
		
		this.start = (letterArray) => {
			for( let i = 0; i < letterArray.length; i++ ) {
				main.innerHTML = main.innerHTML + '<div class="letterbox">' + '<span id=' + i + ' class="hidden">' + letterArray[i] + '</span>' + '</div>';
				console.log(letterArray[i]);
			}
		}

		this.handleKey = (letterArray) => {

			let keyPress = event.key.toLowerCase();

			if ((event.keyCode < 65 && lives !== 0 && correct !== letterArray.length) || (event.keyCode > 90 && lives !== 0 && correct !== letterArray.length)) {
					alert.textContent = 'Not a valid key!';
					setTimeout( function(){
						alert.textContent = '';
					}, 2000);
			} else {
				if (document.getElementsByClassName('show').length !== letterArray.length && lives !== 0) {

					if ( letterArray.indexOf(keyPress) === -1 ) {
						
						if ( guessList.indexOf(keyPress) === -1 ) { 
							lives --;
							lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
							guessList += keyPress + ' ';
							guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
							document.getElementById('life-' + lives).classList.remove('hiddenBody');
						} else if (lives !== 0) {
									alert.textContent = 'You already guessed that letter!';
									setTimeout( function(){
										alert.textContent = '';
									}, 2000);
						}

					} else {

						for( let i = 0; i < letterArray.length; i++ ) {
							
							if ( keyPress === letterArray[i] ){
								document.getElementById(i).className = 'show';
								correct = document.getElementsByClassName('show').length;
								console.log(correct);
								if ( correct === letterArray.length) {

									alert.innerHTML = "You've won, absolutely fantastic!!!<br>Type y to play again!";

									document.addEventListener('keyup', function(e) {

										if ( e.key.toLowerCase() === 'y') location.reload();

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

		this.difficultyLevel = (id, wordDifficultly) => {

				function handleClick() {

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

					document.addEventListener("keyup", function(event){
						
						hangman.handleKey(wordDifficultly);

					});
				}//end handleClick();

				document.getElementById(id).addEventListener('click', handleClick);
		}
	}
}

const hangman = new Hangman();

	document.addEventListener("DOMContentLoaded", function(){
		if ( window.innerWidth > 1200) {
		    AOS.init({
		      offset: 0,
		      duration: 600,
		      easing: 'ease-in-sine',
		      delay: 100,
		    });

			hangman.difficultyLevel('easy', this.easyWord);
			hangman.difficultyLevel('hard', this.hardWord);
		} else {
			document.write('<h3>This project is not supported on smaller screen sizes, please view on a desktop or laptop computer for the best experience.</h3><h4>Support for mobile may come in the future!! :)');
		}

	});//.ready