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

    if(field[0] == field[1] && field[1] == field[2] && field[0]) {
        winner = field[0];
    }
    if(field[3] == field[4] && field[4] == field[5] && field[3]) {
        winner = field[3];
    }
    if(field[6] == field[7] && field[7] == field[8] && field[6]) {
        winner = field[6];
    }
    if(field[0] == field[3] && field[3] == field[6] && field[0]) {
        winner = field[0];
    }
    if(field[1] == field[4] && field[4] == field[7] && field[1]) {
        winner = field[1];
    }
    if(field[2] == field[5] && field[5] == field[8] && field[2]) {
        winner = field[2];
    }
    if(field[0] == field[4] && field[4] == field[8] && field[0]) {
        winner = field[0];
    }
    if(field[2] == field[4] && field[4] == field[6] && field[2]) {
        winner = field[2];
    }

    /* !! Convert to boolen */
    if(!!winner) {
        console.log("Gewinner: " + winner);
    }

}
