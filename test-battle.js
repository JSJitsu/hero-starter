/**

If you'd like to test your hero code locally, run this script using node.

While you do not need to run this script to enter the battle, it is highly
recommended that you run a few test battles to ensure your hero is working as
you intended.

See README.md for more information.

*/

// possible cli options, and their default values
let cliOptions = {
    wait: false,
    turns: 15
};

// accepting cli parameters
var args = require('commander');
args.description('CLI to test the hero.js code locally')
    .option('-w, --wait', 'Turn by turn step through of the battle')
    .option('-t, --turns [int]', 'Specifies how many turns to run', parseInt)
    .parse(process.argv);

// args validation
if (args.turns && isNaN(args.turns)) {
    console.log();
    console.log("**Invalid turns input, input has to be an integer");
    args.outputHelp();
    return false;
}

// overwrite cli parameters
for (var key in args) {
    cliOptions[key] = args[key];
}

// Get the helper file and the Game logic
var ai_battle_engine = require('ai-battle-engine');
var GameEngine = new ai_battle_engine();
var helpers = require('./helpers.js');
var Game = GameEngine.getGame();

// Get my hero's move function ("brain")
var heroMoveFunction = require('./hero.js');

// The move function ("brain") the practice enemy will use
var enemyMoveFunction = function (gameData, helpers) {
  // Move in a random direction

    // var choices = ['North', 'South', 'East', 'West'];

    // return choices[Math.floor(Math.random()*4)];
    return helpers.findNearestHealthWell (gameData);
};

var currentTurn = 0;

// Makes a new game with a 5x5 board
var game = new Game(5);

/**
 * Sets up the game's enviroment and adds heroes, displays startup summary
 */
function gameSetup () {
    // Add a health well in the middle of the board
    game.addHealthWell(2,2);

    // Add diamond mines on either side of the health well
    game.addDiamondMine(2,1);
    game.addDiamondMine(2,3);

    // Add your hero in the top left corner of the map (team 0)
    game.addHero(0, 0, 'MyHero', 0);

    // Add an enemy hero in the bottom left corner of the map (team 1)
    game.addHero(4, 4, 'Enemy', 1);

    if (cliOptions.wait){ // wait mode
        clearScreen();
    }

    console.log('About to start the game!  Here is what the board looks like:');

    // You can run game.board.inspect() in this test code at any time
    // to log out the current state of the board (keep in mind that in the actual
    // game, the game object will not have any functions on it)
    game.board.inspect();

    if (cliOptions.wait){ // wait mode
        console.log();
        console.log("Press ENTER to continue");
    }
}

/**
 * Runs the current turn
 * param {integer} turn - the current turn of the game
 */
function runTurn (turn) {
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
    console.log(hero.name + ' owns ' + hero.mineCount + ' diamond mines');
    console.log(hero.name + ' has ' + hero.health + ' health');
    game.handleHeroTurn(direction);
    game.board.inspect();

    if (cliOptions.wait && turn<cliOptions.turns){ // wait mode
        console.log();
        console.log("Press ENTER to continue");
    }
}

/**
 * Display summary of the game result
 */
function gameSummary () {
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
function gameEnd () {
    gameSummary();
    process.exit();
}

// Utils helper functions
// Clears the console's screen
function clearScreen () {
    process.stdout.write('\033c');
}



// Game Start
gameSetup();

// Run Turns
if (cliOptions.wait){ // wait mode
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');

    process.stdin.on('keypress', (str, key) => {
        if (key.name === 'return') {
            if (currentTurn<cliOptions.turns){
                clearScreen();
                currentTurn++;
                runTurn(currentTurn);
            } else {
                // Game ends
                gameEnd();
            }
        } else if (key.ctrl && key.name==='c'){ // ctrl + c, exit immediately
            console.log("Pressed Ctrl + C, exiting test-battle.js");
            process.exit();
        }
    });
} else { // normal mode, runs in 1 go
    for (currentTurn=1; currentTurn<=cliOptions.turns; currentTurn++) {
        runTurn(currentTurn);
    }
    // Game ends
    gameEnd();
}
