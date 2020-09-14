## Challenge
Using the same applyStateFromUrlHash mindset and technique that we used on your Monster tables...
Program Tic-Tac-Toe.
var gameStateString = 'xox-x---o';
var cells = gameStateString.split('');
Your game state doesn't need to be any more complex than a 9-char string. :wink:
And splitting it by an empty string gets you an array of one char at a time!

## My comments
I need to come up with a board, then decide how fancy I'm getting with 'clickable'ness.
I could have buttons with an id that made a urlStateChange which took on the text of X or O.
or I could try to do something with gif mapping (is that even what it's called?)
