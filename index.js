var gameStateString = '---------';
var cells = gameStateString.split('');
var gameBoard = document.getElementById('game');
var urlParams;

var changeCharInString = function(string, position, char) {
    var array = string.split('');
    array[position] = char;
    return array.join('');
};

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
    console.log('opponentTurn was called');
    var gameArray = gameStateString.split('');
    console.log(gameArray);
    for(var i=8; i>0; i--) {
        console.log('into the for loop');
        if(gameArray[i] === '-') {
            console.log('into the if loop');
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
