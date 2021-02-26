let field = [];
let gameOver = false;
let currentShape = 'cross';
let counter = 0;
let animationTime = 1000;

/**
 * Animates the TIC TAC TOE logo with light and shadow.
 */
function blinkLogo() {
    setTimeout(function () {
        document.getElementById('light1').classList.remove('no-shadow');
    }, animationTime * 1);
    setTimeout(function () {
        document.getElementById('light1').classList.add('no-shadow');
        document.getElementById('light2').classList.remove('no-shadow');
    }, animationTime * 2);
    setTimeout(function () {
        document.getElementById('light2').classList.add('no-shadow');
        document.getElementById('light3').classList.remove('no-shadow');
    }, animationTime * 3);
    setTimeout(function () {
        document.getElementById('light3').classList.add('no-shadow');
    }, animationTime * 4);
    setTimeout(function () {
        document.getElementById('light1').classList.remove('no-shadow');
        document.getElementById('light2').classList.remove('no-shadow');
        document.getElementById('light3').classList.remove('no-shadow');
    }, animationTime * 5);
    setTimeout(function () {
        document.getElementById('light1').classList.add('no-shadow');
        document.getElementById('light2').classList.add('no-shadow');
        document.getElementById('light3').classList.add('no-shadow');
        blinkLogo();
    }, animationTime * 7);
}

/**
 * Puts the usernames into the player panel.
 */
function setNames() {
    let name1 = document.getElementById('input-name1').value;
    let name2 = document.getElementById('input-name2').value;
    document.getElementById('player-1-name').innerHTML = name1;
    document.getElementById('player-2-name').innerHTML = name2;
    startGame();
}

/**
 * Hides the start screen when clicking the let's play button.
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('navbar-text-start').classList.remove('navbar-text-start');
}

/**
 * Sets the current shape (cross or circle) in the chosen field.
 * @param  {number} id - Field Number (0-8).
 */
function setShape(id) {
    /* If field[id] is undefined and gameOver is not true, do something */
    /* I could also write "if(...  && !gameOver == true)" or "if(... && gameOver == false)" */
    if (!field[id] && gameOver == false) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
        } else {
            currentShape = 'cross';
        }
        field[id] = currentShape;
        document.getElementById(currentShape + '-' + id).classList.remove('d-none');
        counter++;
        checkForWinner();
        showActivePlayer();
    }
}

/**
 * Lowers the opacity of the player who is not the turn.
 */
function showActivePlayer() {
    if (currentShape == 'circle') {
        document.getElementById('player-1').classList.add('player-inactive');
        document.getElementById('player-2').classList.remove('player-inactive');
    } else {
        document.getElementById('player-1').classList.remove('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
    }
}

/**
 * Checks if there are three equal shapes in one row, column or diagonal.
 * If so, this value is is assigned to the winner variable.
 * If the winner variable is set or the counter has the value 9 (all fields are set), the game is over.
 */
function checkForWinner() {

    let winner;
    //First Row
    //if(var) means: if this variable is NOT undefined, e.g. if(field[0])
    if (field[0] == field[1] && field[1] == field[2] && field[0]) {
        winner = field[0];
        document.getElementById('first-row').style.transform = 'scaleX(1.0)';
    }
    //Second Row
    if (field[3] == field[4] && field[4] == field[5] && field[3]) {
        winner = field[3];
        document.getElementById('second-row').style.transform = 'scaleX(1.0)';
    }
    //Third Row
    if (field[6] == field[7] && field[7] == field[8] && field[6]) {
        winner = field[6];
        document.getElementById('third-row').style.transform = 'scaleX(1.0)';
    }
    //First Column
    if (field[0] == field[3] && field[3] == field[6] && field[0]) {
        winner = field[0];
        document.getElementById('first-column').style.transform = 'scaleY(1.0)';
    }
    //Second Column
    if (field[1] == field[4] && field[4] == field[7] && field[1]) {
        winner = field[1];
        document.getElementById('second-column').style.transform = 'scaleY(1.0)';
    }
    //Third Column
    if (field[2] == field[5] && field[5] == field[8] && field[2]) {
        winner = field[2];
        document.getElementById('third-column').style.transform = 'scaleY(1.0)';
    }
    //Diagonal From Top Left to Bottom Right
    if (field[0] == field[4] && field[4] == field[8] && field[0]) {
        winner = field[0];
        document.getElementById('first-diagonal').style.transform = 'scale(1.0) rotate(45deg)';
    }
    //Diagonal From Bottom Left to Top Right
    if (field[2] == field[4] && field[4] == field[6] && field[2]) {
        winner = field[2];
        document.getElementById('second-diagonal').style.transform = 'scale(1.0) rotate(-45deg)';
    }

    /* !! Convert to boolen */
    if (!!winner) {
        gameOver = true;
        showGameOver(winner);
    }
    //If it's a tie
    else if (counter == 9) {
        gameOver = true;
        showGameOver(winner);
    }
}

/**
 * Shows game over screen.
 * @param  {string} winner - Values can be 'circle', 'cross' or undefined.
 */
function showGameOver(winner) {
    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
    }, 1000);
    showWinner(winner);
    showRestartButton();
};

/**
 * Shows the winner name or if it's a tie.
 * @param  {string} winner - Values can be 'circle', 'cross' or undefined.
 */
function showWinner(winner) {
    let name1 = document.getElementById('player-1-name').innerText;
    let name2 = document.getElementById('player-2-name').innerText;
    if (winner == 'circle') {
        document.getElementById('winner-box').innerHTML = 'WINNER: <br>' + name1;
    }
    else if (winner == 'cross') {
        document.getElementById('winner-box').innerHTML = 'WINNER: <br>' + name2;
    } else {
        document.getElementById('winner-box').innerHTML = "IT'S A TIE";
    }
    setTimeout(function () {
        document.getElementById('winner-box').classList.remove('d-none');
    }, 1000);
}

/**
 * Shows the restart button for another round.
 */
function showRestartButton() {
    setTimeout(function () {
        document.getElementById('restart-btn').classList.remove('d-none');
    }, 2000);
}

/**
 * Assigns the original values to the variables needed in order to restart the game.
 */
function restart() {
    gameOver = false;
    field = [];
    if (currentShape == 'circle') {
        currentShape = 'circle';
    } else {
        currentShape = 'cross';
    }
    counter = 0;
    hideElementsForRestart();
}

/**
 * Hides the game over screen and clears the playing field.
 */
function hideElementsForRestart() {

    //game over screen with all its elements
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('winner-box').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');

    //shapes
    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }

    //winner lines
    document.getElementById('first-row').style.transform = 'scaleX(0)';
    document.getElementById('second-row').style.transform = 'scaleX(0)';
    document.getElementById('third-row').style.transform = 'scaleX(0)';
    document.getElementById('first-column').style.transform = 'scaleY(0)';
    document.getElementById('second-column').style.transform = 'scaleY(0)';
    document.getElementById('third-column').style.transform = 'scaleY(0)';
    document.getElementById('first-diagonal').style.transform = 'scale(0)';
    document.getElementById('second-diagonal').style.transform = 'scale(0)';
}

/**
* Prevents the reload of the page when the submit button in the message-form is clicked.
*/
function preventReload() {
    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
}