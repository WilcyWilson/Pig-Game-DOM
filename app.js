// global variables
var scores, roundScore, activePlayer, winningScore;

// Running init() function at first
init();



// Not displaying the dice image at first


// adding click event that listens to the button click and runs the anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    // Picking a random number between 1 and 6 inclusive
    dice = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // using dice class to change the image according to the random dice number
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // Changing the current score for the active Player
    // if both dices are 6 then player loses all the scores
    if (dice === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        changeActivePlayer();
    }
    else if (dice !== 1 && dice2 !== 1) {
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // active player is changed
        changeActivePlayer();
    }
});

document.querySelector('.btn-submit').addEventListener('click', function () {
    winningScore = document.getElementById('winningScore').value;
    document.querySelector('.btn-submit').classList.add('disabled');
    document.querySelector('.btn-submit').disabled = true;
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    // add to global score of the active player
    scores[activePlayer] += roundScore;
    // Display global score of active player
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Setting 100 as the winning point for the player
    if (scores[activePlayer] >= winningScore) {
        // Changing Player Name to winner after crossing the winning point.
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

        // Removing dice image after the player wins.
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

        // Adding winner class with some changes to the background color and font and removing active class.
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        // Adding disabled class to buttons for disabled button effect
        document.querySelector('.btn-hold').classList.add('disabled');
        document.querySelector('.btn-roll').classList.add('disabled');

        // Actually Disabling buttons
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.btn-roll').disabled = true;
        // btnHold.style.opacity = '0.6';
        // btnHold.style.cursor = 'not-allowed';
        // btnRoll.style.opacity = '0.6';
        // btnRoll.style.cursor = 'not-allowed';
    } else {
        changeActivePlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function changeActivePlayer() {
    // Changing activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    // Changing active players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

// function that run at first
function init() {
    // Name of Players at first
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    // initialization variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    // intital current and main score set to 0
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    // Enabling buttons after game is restarted
    document.querySelector('.btn-hold').classList.remove('disabled');
    document.querySelector('.btn-roll').classList.remove('disabled');
    document.querySelector('.btn-hold').disabled = false;
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-submit').classList.remove('disabled');
    document.querySelector('.btn-submit').disabled = false;

    // Removing and adding active and winner class after restarting the game
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}