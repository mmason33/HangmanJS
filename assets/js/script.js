// HangmanJS

class Hangman {
	constructor() {

		//assign variables
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
		let hint = document.getElementById('hint');
		let wordDifficultly;		
		
		//select a random word from the wordList arrays based on choice of difficulty
		this.start = (letterArray) => {
			for( let i = 0; i < letterArray.length; i++ ) {
				main.innerHTML = main.innerHTML + '<div class="letter">' + '<span id=' + i + ' class="hidden">' + letterArray[i] + '</span>' + '</div>';
				console.log(letterArray[i]);
			}
		}

		this.handleKey = (letterArray) => {

			//assign event
			let keyPress = event.key.toLowerCase();

			//handle keyPress validation - only alphabetical keys are valid
			if ((event.keyCode < 65 && lives !== 0 && correct !== letterArray.length) || (event.keyCode > 90 && lives !== 0 && correct !== letterArray.length)) {
					alert.textContent = 'Not a valid key!';
					setTimeout( function(){
						alert.textContent = '';
					}, 2000);
			} else {
				//code block to handle incorrect keyPress choices
				if (document.getElementsByClassName('show').length !== letterArray.length && lives !== 0) {
				//if the amount of 'show' classes !== the length of the random word and lives !== 0
					if ( letterArray.indexOf(keyPress) === -1 ) {
						//if keyPress is not in the given randomWord
						if ( guessList.indexOf(keyPress) === -1 ) { 
							//if keyPress is not in the already guessed letters - excute data adjustments below
							lives --;
							lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
							guessList += keyPress + ' ';
							guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
							document.getElementById('life-' + lives).classList.remove('hiddenBody');//remove class to show hangman parts
						} else if (lives !== 0) {
									//if keyPress is not in the given randomWord but is already in the guessed letters
									alert.textContent = 'You already guessed that letter!';
									setTimeout( function(){
										alert.textContent = '';
									}, 2000);
						}
						//end handle incorrect keyPress
					} else {
						//code block to handle correct keyPress
						for( let i = 0; i < letterArray.length; i++ ) {
							//iterate throught the correct word after each keyPress
							if ( keyPress === letterArray[i] ){
								//if keyPress is in the randomWord
								document.getElementById(i).className = 'show';
								correct = document.getElementsByClassName('show').length;//correct counter === number of show classes in the DOM
								if ( correct === letterArray.length) {
									//if correct === number of show classes
									alert.innerHTML = "You've won, absolutely fantastic!!!<br>Type y to play again!";
									document.addEventListener('keyup', function(e) {
										if ( e.key.toLowerCase() === 'y') location.reload();//reload browers
									});
								}
							}
						}
					}
					//code block when lives === 0 - all conditions about are contingent upon lives !== 0
					if (lives === 0) {
						alert.innerHTML = 'You ran out of lives :( - Do you want to play again? <br><strong>Type y for yes.';
						document.addEventListener( 'keyup', function(e){
							if ( e.key.toLowerCase() === 'y') location.reload();//reload browser
						});
					}
				}
			}
		}

		this.difficultyLevel = (id, wordDifficultly) => {
				//method to decide difficulty level
				function handleClick() {
					//decide difficulty based on click event
					if ( id === 'easy') {
						wordDifficultly = easyWord;
						hangman.start(easyWord);
						hint.innerHTML = '<br><h5>Hint: Think colors...</h5>';
					} else {
						wordDifficultly = hardWord;
						hangman.start(hardWord);
						hint.innerHTML = '<br><h5>Hint: Think Javascript...</h5>';
					}
					//after click remove the #difficulty node and show #afterClick node
					difficulty.style.display = 'none';
					lifeCount.innerHTML = '<p>Lives: ' + lives + '</p>';
					guesses.innerHTML = '<p>Already guessed: ' + guessList + '</p>';
					document.querySelector('.image-container').style.display = 'block';
					document.getElementById('hangman-title').style.display = 'block';
					//initialize main keyup event after click
					document.addEventListener("keyup", function(event){
						
						hangman.handleKey(wordDifficultly);

					});
				}//end handleClick();

				document.getElementById(id).addEventListener('click', handleClick);//invoke event listener with handleClick function
		}
	}
}

const hangman = new Hangman();//create a new instance of the Hangman class and or object

	document.addEventListener("DOMContentLoaded", function(){//dom load event listener
		if ( window.innerWidth > 1024) {//added a conditional for smaller screen sizes
			//AOS library for the animation at the beginning
		    AOS.init({
		      offset: 0,
		      duration: 600,
		      easing: 'ease-in-sine',
		      delay: 100,
		    });
		    //invoke the methods
		    //by calling hangman.difficultyLevel, based on the click event hangman.start is called with a difficulty choice, during that same click event
		    //DOM elements are removed or display and given intial values on start.
		    //in the same click event, the keyup listener is initialized while invoking the hangman.handlekey method.
			hangman.difficultyLevel('easy', this.easyWord);
			hangman.difficultyLevel('hard', this.hardWord);
		} else {
			document.write('<h3>This project is not supported on smaller screen sizes, please view on a desktop or laptop computer for the best experience.</h3><h4>Support for mobile may come in the future!! :)');
		}

	});//.ready
