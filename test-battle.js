/*

If you'd like to test your hero code locally,
run this code using node (must have node installed).

Please note that you DO NOT need to do this to enter javascript
battle, it is simply an easy way to test whether your new hero
code will work in the javascript battle.

To run:

  -Install node
  -Run the following in your terminal:

    node test_your_hero_code.js

  -If you don't see any errors in your terminal, the code works!

*/

// potentail cli options
// assuming flag type cli options need to start with '--', e.g. '--wait'
// can add other pameters later on
let cliOptions = { wait: false };

// process cli arguments if any
for(let i=0; i<process.argv.length; i++){
    var cParam = process.argv[i].replace('--', '');
    // if its in the cliOptions list, flip the flag
    if( typeof( cliOptions[cParam] ) !== 'undefined' ){
        cliOptions[cParam] = true;
    }
}

// Get the helper file and the Game logic
var helpers = require('./helpers.js');
var Game = require('./game_logic/Game.js');

// Get my hero's move function ("brain")
var heroMoveFunction = require('./hero.js');

// The move function ("brain") the practice enemy will use
var enemyMoveFunction = function (gameData, helpers) {
  // Move in a random direction

    // var choices = ['North', 'South', 'East', 'West'];

    // return choices[Math.floor(Math.random()*4)];
    return helpers.findNearestHealthWell (gameData);
}

// Play a very short practice game
var turnsToPlay = 15;
var currentTurn = 0;

// Makes a new game with a 5x5 board
var game = new Game(5);

/**
 * Sets up the game's enviroment and adds heroes, displays startup summary
 */
function gameSetup(){
    // Add a health well in the middle of the board
    game.addHealthWell(2,2);

    // Add diamond mines on either side of the health well
    game.addDiamondMine(2,1);
    game.addDiamondMine(2,3);

    // Add your hero in the top left corner of the map (team 0)
    game.addHero(0, 0, 'MyHero', 0);

    // Add an enemy hero in the bottom left corner of the map (team 1)
    game.addHero(4, 4, 'Enemy', 1);

    if(cliOptions['wait']){ // wait mode
        helpers.clearScreen();
    }

    console.log('About to start the game!  Here is what the board looks like:');

    // You can run game.board.inspect() in this test code at any time
    // to log out the current state of the board (keep in mind that in the actual
    // game, the game object will not have any functions on it)
    game.board.inspect();

    if(cliOptions['wait']){ // wait mode
        console.log();
        console.log("Press ENTER to continue");
    }
}

/**
 * Runs the current turn
 * param {integer} turn - the current turn of the game
 */
function runTurn(turn){
    var hero = game.activeHero;
    var direction;
    if (hero.name === 'MyHero') {
      // Ask your hero brain which way it wants to move
        direction = heroMoveFunction(game, helpers);
    } else {
        direction = enemyMoveFunction(game, helpers);
    }
    console.log('-----');
    console.log('Turn ' + turn + ':');
    console.log('-----');
    console.log(hero.name + ' tried to move ' + direction);
    console.log(hero.name + ' owns ' + hero.mineCount + ' diamond mines')
    console.log(hero.name + ' has ' + hero.health + ' health')
    game.handleHeroTurn(direction);
    game.board.inspect();

    if(cliOptions['wait'] && turn<turnsToPlay){ // wait mode
        console.log();
        console.log("Press ENTER to continue");
    }
}

/**
 * Display summary of the game result
 */
function gameSummary(){
    if (game.winningTeam === 0) {
        console.log('You have won!');
    } else if (game.winningTeam === 1) {
        console.log('You have lost.');
    } else {
        console.log('The game has ended with no winner.');
    }
}

/**
 * End of game, what to do?
 */
function gameEnd(){
    gameSummary();
    process.exit();
}


// Game Start
gameSetup();

// Run Turns
if(cliOptions['wait']){ // wait mode
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');

    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'return') {
            if(currentTurn<turnsToPlay){
                helpers.clearScreen();
                currentTurn++;
                runTurn(currentTurn);
            }else{
                // Game ends
                gameEnd();
            }
        }else if(key.ctrl && key.name==='c'){ // ctrl + c, exit immediately
            console.log("Pressed Ctrl + C, exiting test-battle.js");
            process.exit();
        }
    });
}else{ // normal mode, runs in 1 go
    for (currentTurn=1; currentTurn<=turnsToPlay; currentTurn++) {
        runTurn(currentTurn);
    }
    // Game ends
    gameEnd();
}
