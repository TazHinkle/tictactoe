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

var checkForXWin = function() {
    var array = gameStateString.split('');
    if(array[0] === 'x') {
        if(array[1]  === 'x' && array[2] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        } else if(array[3]  === 'x' && array[6] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        } else if(array[4]  === 'x' && array[8] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        }
    } else if(array[4] === 'x') {
        if(array[3]  === 'x' && array[5] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        } else if(array[1]  === 'x' && array[7] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        } else if(array[2]  === 'x' && array[6] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        }
    } else if(array[5] === 'x') {
        if(array[2]  === 'x' && array[8] === 'x') {
            winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
        }
    } else if(array[6] === 'x' && array[7] === 'x' && array[8] === 'x') {
        winnerMessage.innerHTML = `
            <p>Player has won!</p>
            `
    }
};

var checkForOWin = function() {
    var array = gameStateString.split('');
    if(array[0] === 'o') {
        if(array[1]  === 'o' && array[2] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        } else if(array[3]  === 'o' && array[6] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        } else if(array[4]  === 'o' && array[8] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        }
    } else if(array[4] === 'o') {
        if(array[3]  === 'o' && array[5] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        } else if(array[1]  === 'o' && array[7] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        } else if(array[2]  === 'o' && array[6] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        }
    } else if(array[5] === 'o') {
        if(array[2]  === 'o' && array[8] === 'o') {
            winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
        }
    } else if(array[6] === 'o' && array[7] === 'o' && array[8] === 'o') {
        winnerMessage.innerHTML = `
            <p>Player has lost!</p>
            `
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
    checkForOWin();
}

var actUponHashParameters = function(urlString) {
    urlParams = parseUrlHash(urlString);
    console.log('window hash change listener', urlParams);
    var changedCell = parseInt(urlParams.change_cell);
    var value = urlParams.value;
    gameStateString = changeCharInString(gameStateString, changedCell, value);
    checkForXWin();
    opponentTurn();
    console.log('current gameStateString', gameStateString);
    renderGameBoard();
}

window.addEventListener("hashchange", function(hashChangeEvent) {
    actUponHashParameters(hashChangeEvent.newURL);
});

var renderGameCell = function(i) {
    cell = `
        |
        <a href="#?state=${gameStateString}&change_cell=${i}&value=x">
        ${gameStateString[i]} </a>
        |
    `
    return cell;
}

var renderGameBoard = function() {
    gameBoard.innerHTML = `
        <p>
            ${renderGameCell(0)}
            ${renderGameCell(1)}
            ${renderGameCell(2)}
        </p>
        <p>
            ${renderGameCell(3)}
            ${renderGameCell(4)}
            ${renderGameCell(5)}
        </p>
        <p>
            ${renderGameCell(6)}
            ${renderGameCell(7)}
            ${renderGameCell(8)}
        </p>
            `
}

actUponHashParameters(window.location.href);
