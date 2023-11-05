let headsButton = document.querySelector('.js-heads-button');
let tailsButton = document.querySelector('.js-tails-button');
let resetButton = document.querySelector('.js-reset-score-button');

alert('Rules \n 1. If you both choose the same side, You Win \n 2. If you both choose different sides, You lose ')

const gameScore = {
    Wins: 0,
    Loses: 0
}


document.body.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
      playGame('Heads');
      message.innerHTML = ' ';
    } else if(event.key === 't') {
      playGame('Tails');
      message.innerHTML = ' ';
    }  else if (event.key === 'a') {
        autoPlay();
        message.innerHTML = ' ';
    }
});

let message = document.querySelector('.js-confirmation');
message.innerHTML = ' ';
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Delete') {
      message.innerHTML = `
      Are you sure you want to reset the score? 
        <button class="yes-button js-yes-button"> Yes </No>
        <button class="no-button js-no-button"> No </button`;
  
      let yesButton = document.querySelector('.js-yes-button');
      let noButton = document.querySelector('.js-no-button');
  
      yesButton.addEventListener('click', () => {
        gameScore.Loses = 0;
        gameScore.Wins = 0;
    
        document.querySelector('.js-game-score').innerHTML = `Wins: ${gameScore.Wins}. Loses: ${gameScore.Loses}`;
            alert('Score was Reset');
        message.innerHTML = ' ';
      })
      noButton.addEventListener('click', () => {
        message.innerHTML = '';
      });
    };
  });

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = ' ';

    if(randomNumber >= 0 && randomNumber < 0.5) {
        computerMove = 'Heads';
    } else if(randomNumber >= 0.5 && randomNumber < 1) {
        computerMove = 'Tails'
    }
    return computerMove;
}

function playGame(playerMove) {
    let resultSpace = document.querySelector('.js-result-space');

    let result = ' ';
    message.innerHTML = ' ';

    setTimeout(() => {
        resultSpace.innerHTML = 'Tossing Coin...'
    }, 1000);

    setTimeout(() => {
        const computerMove = pickComputerMove();
    
        if (playerMove === 'Heads') {
            if (computerMove === 'Heads') {
                result = 'You win';
            } else {
                result = 'You lose'
            }
        } else if (playerMove === 'Tails') {
            if (computerMove === 'Tails') {
                result = 'You win';
            } else {
                result = 'You lose';
            }
        }

    
        if (result === 'You win') {
            gameScore.Wins++
        } else if (result === 'You lose') {
            gameScore.Loses++
        }

        resultSpace.innerHTML = `<div class="container">
            <div class="result"> ${result} </div>
            <div class="js-result-space result-space">
                You 
                <img src="img/${playerMove}-emoji.jpg" class="move-emoji">
                <img src="img/${computerMove}-emoji.jpg" class="move-emoji">
                Computer.
            </div>
            <div class="game-score js-game-score"> Wins: ${gameScore.Wins}. Loses: ${gameScore.Loses}
        </div>`;
    }, 3000);
}
headsButton.addEventListener('click', () => playGame('Heads'));
tailsButton.addEventListener('click', () => playGame('Tails'));


let intervalId;
let autoPlayButton = document.querySelector('.js-auto-play-button');
function autoPlay() {
    if(autoPlayButton.innerText === 'Auto Play') {
        setTimeout(() => {
          autoPlayButton.innerText = 'Stop Playing'
        }, 2000);
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove()
        playGame(playerMove);
    }, 3000);
    } else {
        autoPlayButton.innerText = 'Auto Play'
        clearInterval(intervalId)
    }
}
autoPlayButton.addEventListener('click', () => autoPlay());


function resetScore() {
          message.innerHTML = `
          Are you sure you want to reset the score? 
            <button class="yes-button js-yes-button"> Yes </button>
            <button class="no-button js-no-button"> No </button`;
      
          let yesButton = document.querySelector('.js-yes-button');
          let noButton = document.querySelector('.js-no-button');
      
          yesButton.addEventListener('click', () => {
            gameScore.Loses = 0;
            gameScore.Wins = 0;
        
            document.querySelector('.js-game-score').innerHTML = `Wins: ${gameScore.Wins}. Loses: ${gameScore.Loses}`;
                alert('Score was Reset');
            message.innerHTML = ' ';
          })
          noButton.addEventListener('click', () => {
            message.innerHTML = '';
          });
          
      };
resetButton.addEventListener('click', resetScore);