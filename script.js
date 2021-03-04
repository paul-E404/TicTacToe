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
    document.getElementById('playing-field').innerHTML = `
        <tr>
            <td>
                <div onmousedown="setShape(0)" class="shape-box">
                    <img id="${game["field0"]}-0" class="shape" src="img/${game["field0"]}.png" alt="${game["field0"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(1)" class="shape-box">
                    <img id="${game["field1"]}-0" class="shape" src="img/${game["field1"]}.png" alt="${game["field1"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(2)" class="shape-box">
                    <img id="${game["field2"]}-0" class="shape" src="img/${game["field2"]}.png" alt="${game["field2"]}">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div onmousedown="setShape(3)" class="shape-box">
                    <img id="${game["field3"]}-0" class="shape" src="img/${game["field3"]}.png" alt="${game["field3"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(4)" class="shape-box">
                    <img id="${game["field4"]}-0" class="shape" src="img/${game["field4"]}.png" alt="${game["field4"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(5)" class="shape-box">
                    <img id="${game["field5"]}-0" class="shape" src="img/${game["field5"]}.png" alt="${game["field5"]}">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div onmousedown="setShape(6)" class="shape-box">
                    <img id="${game["field6"]}-0" class="shape" src="img/${game["field6"]}.png" alt="${game["field6"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(7)" class="shape-box">
                    <img id="${game["field7"]}-0" class="shape" src="img/${game["field7"]}.png" alt="${game["field7"]}">
                </div>
            </td>
            <td>
                <div onmousedown="setShape(8)" class="shape-box">
                    <img id="${game["field8"]}-0" class="shape" src="img/${game["field8"]}.png" alt="${game["field8"]}">
                </div>
            </td>
        </tr>
    `
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
        /* document.getElementById(game["currentShape"] + '-' + id).classList.remove('d-none'); */
        game["counter"]++;

        /* Save game JSON to backend */
        saveToBackend();
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

    /* if(!!winner) {} => !! Convert to boolen */
    if (winner != undefined) {
        game["gameOver"] = true;
        saveToBackend();
        showGameOver(winner);
        console.log("show Game Over wird ber die !!winner if bedingung aufgerufen!");
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
    setTimeout(function() {
        clearField();
    }, 1000);
};

function clearField() {
    for (let i = 0; i < 9; i++) {
        game[`field${i}`] = undefined;
    }
    game["counter"] = 0;
    saveToBackend();
}

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
        game[`field${i}`] = undefined;
    }
    game["counter"] = 0;

    /* Save JSON to backend */
    saveToBackend();
    console.log("restart funktion wird mehrmals aufgerufen!");
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
}

setInterval(getFromBackend, 1000);

/**
 * Loads the current saved JSON from backend.
 */
async function getFromBackend() {
    await downloadFromServer();
    game = JSON.parse(backend.getItem('game')) || [];
    update();
}

/* function deleteFromBackend() {
    console.log("deleteFromBackend wird aufgerufen!");
} */


function update() {
    showTable();
    showNames();
    if (game["viewWelcomeScreen"] == false) {
        hideWelcomeScreen();
    }
    showActivePlayer();
    checkForWinner();
    /* If one player pushed the restart button, the game restarts on both screens. */
    if (game["gameOver"] == false && game["counter"] == 0) {
        restart();
    }
}