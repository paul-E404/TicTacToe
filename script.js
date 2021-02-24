let field = [];
let currentShape = 'cross';

function setShape(id) {

    /* If field[id] is undefined, do something */
    if(!field[id]){
        if(currentShape == 'cross') {
            currentShape = 'circle';
        } else {
            currentShape = 'cross';
        }
    
        field[id] = currentShape;
        document.getElementById(currentShape + '-' + id).classList.remove('d-none');
        checkForWinner();
        showActivePlayer();
    }
}


function showActivePlayer() {
    if(currentShape == 'circle') {
        document.getElementById('player-1').classList.add('player-inactive');
        document.getElementById('player-2').classList.remove('player-inactive');
    } else {
        document.getElementById('player-1').classList.remove('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
    }
}

/**
 * 
 * if(var) means: if this variable is NOT undefined, e.g. if(field[0])
 */
function checkForWinner() {

    let winner;
    //First Row
    if(field[0] == field[1] && field[1] == field[2] && field[0]) {
        winner = field[0];
        document.getElementById('first-row').style.transform = 'scaleX(1.0)';
    }
    //Second Row
    if(field[3] == field[4] && field[4] == field[5] && field[3]) {
        winner = field[3];
        document.getElementById('second-row').style.transform = 'scaleX(1.0)';
    }
    //Third Row
    if(field[6] == field[7] && field[7] == field[8] && field[6]) {
        winner = field[6];
        document.getElementById('third-row').style.transform = 'scaleX(1.0)';
    }
    //First Column
    if(field[0] == field[3] && field[3] == field[6] && field[0]) {
        winner = field[0];
        document.getElementById('first-column').style.transform = 'scaleY(1.0)';
    }
    //Second Column
    if(field[1] == field[4] && field[4] == field[7] && field[1]) {
        winner = field[1];
        document.getElementById('second-column').style.transform = 'scaleY(1.0)';
    }
    //Third Column
    if(field[2] == field[5] && field[5] == field[8] && field[2]) {
        winner = field[2];
        document.getElementById('third-column').style.transform = 'scaleY(1.0)';
    }
    //Diagonal From Top Left to Bottom Right
    if(field[0] == field[4] && field[4] == field[8] && field[0]) {
        winner = field[0];
        document.getElementById('first-diagonal').style.transform = 'scale(1.0) rotate(45deg)';
    }
    //Diagonal From Bottom Left to Top Right
    if(field[2] == field[4] && field[4] == field[6] && field[2]) {
        winner = field[2];
        document.getElementById('second-diagonal').style.transform = 'scale(1.0) rotate(-45deg)';
    }

    /* !! Convert to boolen */
    if(!!winner) {
        console.log("Gewinner: " + winner);
    }

}