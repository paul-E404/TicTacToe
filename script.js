let field = [];
let gameOver = false;
let currentShape = 'cross';
let counter = 0;
let animationTime = 1000;
let viewWelcomeScreen = true;

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
 * Saves the usernames into the JSON array after filling out the input fields.
 */
function setNames() {
    let name1 = document.getElementById('input-name1').value;
    let name2 = document.getElementById('input-name2').value;
    game["player1"] = name1;
    game["player2"] = name2;

    /* Save JSON to backend */
    saveToBackend();

    startGame();
}

/**
 * Puts the usernames into the player panel.
 */
function showNames() {
    console.log("showNames ausgeführt!");
    document.getElementById('player-1-name').innerHTML = game["player1"];
    document.getElementById('player-2-name').innerHTML = game["player2"];
};

/**
 * Executes some start functions when clicking the let's play button.
 */
function startGame() {
    showNames();
    hideWelcomeScreen();
    showTable();
}

/**
 * Hides the welcome screen.
 */
function hideWelcomeScreen() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('navbar-text-start').classList.remove('navbar-text-start');
    /* Save changed game JSON to backend. */
    game["viewWelcomeScreen"] = false;
    saveToBackend();
}

function showTable() {
    document.getElementById('playing-field').innerHTML = '';
    document.getElementById('playing-field').innerHTML = createTable();
}

function createTable() {
    return `
        <tr>
            <td>
                <div onclick="setShape(0)" class="shape-box">
                    <img id="circle-0" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-0" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(1)" class="shape-box">
                    <img id="circle-1" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-1" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(2)" class="shape-box">
                    <img id="circle-2" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-2" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div onclick="setShape(3)" class="shape-box">
                    <img id="circle-3" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-3" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(4)" class="shape-box">
                    <img id="circle-4" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-4" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(5)" class="shape-box">
                    <img id="circle-5" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-5" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div onclick="setShape(6)" class="shape-box">
                    <img id="circle-6" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-6" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(7)" class="shape-box">
                    <img id="circle-7" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-7" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
            <td>
                <div onclick="setShape(8)" class="shape-box">
                    <img id="circle-8" class="shape d-none" src="img/circle.png" alt="circle">
                    <img id="cross-8" id="circle" class="shape d-none" src="img/cross.png" alt="cross">
                </div>
            </td>
        </tr>`
}


/**
 * Sets the current shape (cross or circle) in the chosen field.
 * @param  {number} id - Field Number (0-8).
 */
function setShape(id) {
    /* If field[id] is undefined and gameOver is not true, do something */
    /* I could also write "if(...  && !gameOver == true)" or "if(... && gameOver == false)" */
    if (!game[`field${id}`] && game["gameOver"] == false) {
        if (game["currentShape"] == 'cross') {
            game["currentShape"] = 'circle';
        } else {
            game["currentShape"] = 'cross';
        }
        game[`field${id}`] = game["currentShape"];
        document.getElementById(game["currentShape"] + '-' + id).classList.remove('d-none');
        game["counter"]++;

        /* Save game JSON to backend */
        saveToBackend();
        
        checkForWinner();
        showActivePlayer();
    }
}

/**
 * Lowers the opacity of the player who is not the turn.
 */
function showActivePlayer() {
    if (game["currentShape"] == 'circle') {
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
    if (game["field0"] == game["field1"] && game["field1"] == game["field2"] && game["field0"]) {
        winner = game["field0"];
        document.getElementById('first-row').style.transform = 'scaleX(1.0)';
    }
    //Second Row
    if (game["field3"] == game["field4"] && game["field4"] == game["field5"] && game["field3"]) {
        winner = game["field3"];
        document.getElementById('second-row').style.transform = 'scaleX(1.0)';
    }
    //Third Row
    if (game["field6"] == game["field7"] && game["field7"] == game["field8"] && game["field6"]) {
        winner = game["field6"];
        document.getElementById('third-row').style.transform = 'scaleX(1.0)';
    }
    //First Column
    if (game["field0"] == game["field3"] && game["field3"] == game["field6"] && game["field0"]) {
        winner = game["field0"];
        document.getElementById('first-column').style.transform = 'scaleY(1.0)';
    }
    //Second Column
    if (game["field1"] == game["field4"] && game["field4"] == game["field7"] && game["field1"]) {
        winner = game["field1"];
        document.getElementById('second-column').style.transform = 'scaleY(1.0)';
    }
    //Third Column
    if (game["field2"] == game["field5"] && game["field5"] == game["field8"] && game["field2"]) {
        winner = game["field2"];
        document.getElementById('third-column').style.transform = 'scaleY(1.0)';
    }
    //Diagonal From Top Left to Bottom Right
    if (game["field0"] == game["field4"] && game["field4"] == game["field8"] && game["field0"]) {
        winner = game["field0"];
        document.getElementById('first-diagonal').style.transform = 'scale(1.0) rotate(45deg)';
    }
    //Diagonal From Bottom Left to Top Right
    if (game["field2"] == game["field4"] && game["field4"] == game["field6"] && game["field2"]) {
        winner = game["field2"];
        document.getElementById('second-diagonal').style.transform = 'scale(1.0) rotate(-45deg)';
    }

    /* !! Convert to boolen */
    if (!!winner) {
        game["gameOver"] = true;
        saveToBackend();
        showGameOver(winner);
    }
    //If it's a tie
    else if (game["counter"] == 9) {
        game["gameOver"] = true;
        saveToBackend();
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
    game["gameOver"] = false;
    if (game["currentShape"] == 'circle') {
        game["currentShape"] = 'circle';
    } else {
        game["currentShape"] = 'cross';
    }
    for (let i = 0; i < 9; i++) {
        game[`field${i}`] = '';
    }
    game["counter"] = 0;

    /* Save JSON to backend */
    saveToBackend();

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
 * Toggles game instructions.
 */
function toggleGameInstructions() {
    let gameInstructions = document.getElementById('game-instructions');
    if (gameInstructions.classList.contains('d-none')) {
        gameInstructions.classList.remove('d-none');
    }
    else {
        gameInstructions.classList.add('d-none');
    }
}

/**
* Prevents the reload of the page when the submit button in the message-form is clicked.
*/
function preventReload() {
    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
}

/* Backend */

setURL('http://paul-engerling.developerakademie.com/Modul8/TicTacToe/smallest_backend_ever-master');

let game = {
    "player1": "Player 1",
    "player2": "Player 2",
    //players: [],
    currentShape: "cross",
    "field0": field[0],
    "field1": field[1],
    "field2": field[2],
    "field3": field[3],
    "field4": field[4],
    "field5": field[5],
    "field6": field[6],
    "field7": field[7],
    "field8": field[8],
    counter: 0,
    viewWelcomeScreen: true,     
    gameOver: false
};

function saveToBackend() {
    backend.setItem('game', JSON.stringify(game));
    console.log(game);
}

setInterval(getFromBackend, 1000);

async function getFromBackend() {
    await downloadFromServer();
    game = JSON.parse(backend.getItem('game')) || [];
    update();
}

function deleteFromBackend() {
    console.log("deleteFromBackend wird aufgerufen!");
}

function update() {
    showTable();
    showNames();
    if(game["viewWelcomeScreen"] == false) {
        hideWelcomeScreen();
    }
    showActivePlayer();
    checkForWinner();
    /* If one player pushed the restart button, the game restarts on both screens. */
    if(game["gameOver"] == false && game["counter"] == 0) {
        restart();
    }
}