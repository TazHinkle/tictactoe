var gameStateString = '---------';
var cells = gameStateString.split('');
var gameBoard = document.getElementById('game');
var urlParams;
var winnerMessage = document.getElementById('message');
var gameOver = false;

var changeCharInString = function(string, position, char) {
    var array = string.split('');
    array[position] = char;
    return array.join('');
};

var playerWinMessage = function() {
    winnerMessage.innerHTML = `
        <p>Player has won!</p>
        <p><a href="./index.html">Restart Game?</a></p>
        `
}

var checkForXWin = function() {
    var array = gameStateString.split('');
    if(array[0] === 'x') {
        if(array[1]  === 'x' && array[2] === 'x') {
            gameOver = true;
            playerWinMessage();
        } else if(array[3]  === 'x' && array[6] === 'x') {
            gameOver = true;
            playerWinMessage();
        } else if(array[4]  === 'x' && array[8] === 'x') {
            gameOver = true;
            playerWinMessage();
        }
    } else if(array[4] === 'x') {
        if(array[3]  === 'x' && array[5] === 'x') {
            gameOver = true;
            playerWinMessage();
        } else if(array[1]  === 'x' && array[7] === 'x') {
            gameOver = true;
            playerWinMessage();
        } else if(array[2]  === 'x' && array[6] === 'x') {
            gameOver = true;
            playerWinMessage();
        }
    } else if(array[5] === 'x') {
        if(array[2]  === 'x' && array[8] === 'x') {
            gameOver = true;
            playerWinMessage();
        }
    } else if(array[6] === 'x' && array[7] === 'x' && array[8] === 'x') {
        gameOver = true;
        playerWinMessage();
    }
};

var playerLostMessage = function() {
    winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            <p><a href="./index.html">Restart Game?</a></p>
            `
}

var checkForOWin = function() {
    var array = gameStateString.split('');
    if(array[0] === 'o') {
        if(array[1]  === 'o' && array[2] === 'o') {
            playerLostMessage();
            gameOver = true;
        } else if(array[3]  === 'o' && array[6] === 'o') {
            playerLostMessage();
            gameOver = true;
        } else if(array[4]  === 'o' && array[8] === 'o') {
            playerLostMessage();
            gameOver = true;
        }
    } else if(array[4] === 'o') {
        if(array[3]  === 'o' && array[5] === 'o') {
            playerLostMessage();
            gameOver = true;
        } else if(array[1]  === 'o' && array[7] === 'o') {
            playerLostMessage();
            gameOver = true;
        } else if(array[2]  === 'o' && array[6] === 'o') {
            playerLostMessage();
            gameOver = true;
        }
    } else if(array[5] === 'o') {
        if(array[2]  === 'o' && array[8] === 'o') {
            playerLostMessage();
            gameOver = true;
        }
    } else if(array[6] === 'o' && array[7] === 'o' && array[8] === 'o') {
        gameOver = true;
        playerLostMessage();
        
    }
}

var parseUrlHash = function(urlString) {
    var hash = urlString.split('#').pop();
    var params = {};
    hash.slice(1).split("&").forEach(function(item) {
        var split = item.split('=');
        params[split[0]] = split[1];
    });
    return params;
};

var opponentTurn = function() {
    var gameArray = gameStateString.split('');
    console.log(gameArray);
    for(var i=8; i>0; i--) {
        if(gameArray[i] === '-') {
            gameStateString = changeCharInString(gameStateString, i, 'o');
            break;
        }
    }
}

var actUponHashParameters = function(urlString) {
    urlParams = parseUrlHash(urlString);
    console.log('window hash change listener', urlParams);
    var changedCell = parseInt(urlParams.change_cell);
    var value = urlParams.value;
    gameStateString = changeCharInString(gameStateString, changedCell, value);
    checkForXWin();
    if(!gameOver) {
        opponentTurn();
        checkForOWin();
    }
    console.log('current gameStateString', gameStateString);
    renderGameBoard();
}

window.addEventListener("hashchange", function(hashChangeEvent) {
    actUponHashParameters(hashChangeEvent.newURL);
});

var renderGameCell = function(i, array) {
    if(array[i] === '-') {
        cell = `
            |
            <a href="#?state=${gameStateString}&change_cell=${i}&value=x">
            ${gameStateString[i]} </a>
            |
        `
    } else {
        cell = `
        |
        ${gameStateString[i]}
        |
    `
    }
    return cell;
}

var renderGameOverCell = function(i) {
    cell = `
        |
        ${gameStateString[i]}
        |
    `
    return cell;
}

var renderGameBoard = function() {
    var array = gameStateString.split('');
    if(!gameOver) {
        gameBoard.innerHTML = `
            <p>
                ${renderGameCell(0, array)}
                ${renderGameCell(1, array)}
                ${renderGameCell(2, array)}
            </p>
            <p>
                ${renderGameCell(3, array)}
                ${renderGameCell(4, array)}
                ${renderGameCell(5, array)}
            </p>
            <p>
                ${renderGameCell(6, array)}
                ${renderGameCell(7, array)}
                ${renderGameCell(8, array)}
            </p>
            `
    } else {
        gameBoard.innerHTML = `
            <p>
                ${renderGameOverCell(0)}
                ${renderGameOverCell(1)}
                ${renderGameOverCell(2)}
            </p>
            <p>
                ${renderGameOverCell(3)}
                ${renderGameOverCell(4)}
                ${renderGameOverCell(5)}
            </p>
            <p>
                ${renderGameOverCell(6)}
                ${renderGameOverCell(7)}
                ${renderGameOverCell(8)}
            </p>
            `
    }
}

renderGameBoard();
