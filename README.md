[![Build Status](https://travis-ci.org/JSJitsu/hero-starter.svg?branch=master)](https://travis-ci.org/JSJitsu/hero-starter)
# JavaScript Fight Club - Hero Starter

## Getting Started

If you are anxious to join the fight, all you need to do is fork this repo and [sign in to the game](http://jsfight.club/). It's that easy.

You must know a little bit of Git to get started. If you already know it, skip to step 3.

### Steps

1. [Install Git](https://help.github.com/articles/set-up-git/).
2. [Learn to fork](https://help.github.com/articles/fork-a-repo/).
3. Fork this repo so you have your own hero-starter.
4. Enroll your hero by signing in to the [JavaScript Fight Club](http://jsfight.club/) game.

## Changing the Hero

### Basic Skills
This game is played by writing JavaScript code. If you have never used JavaScript before, the following resources can help:
  * [Codecademy](http://www.codecademy.com/)
  * [Khan Academy](https://www.khanacademy.org/)
  * [Coderbyte](http://www.coderbyte.com/)
  * [Code School](https://www.codeschool.com/)
  * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


### Making Your Hero Smarter (or not)
If you take a look at *hero.js*, you will notice that there are different move functions. Each function describes a specific type of hero behavior. 

  * The **Northerner** cares about moving North... all the time.
  * The **Blind Man** moves randomly around the board.
  * The **Unwise Assassin** only cares about killing other players, possibly to his own demise.
  * The **Careful Assassin** goes after other players as well, but cares more about his health than the "Unwise Assassin."
  * The **Safe Diamond Miner** cares about mining diamonds and making sure he or she is alive at the end of the game to enjoy the wealth.
  * The **Selfish Diamond Miner** cares about mining diamonds, but will also capture his own team's diamond mines.
  * The **Coward** will find the nearest health well and stay there.

If you want to try something different, change the `move` toward the bottom of the file and try it out. You can save your changes and push them back to Github (readying your hero for the next battle) or you can test the change locally to see if that's how you want your hero to behave.

Once you get acclimated to the different types of heroes and think you want to give writing your own hero a shot, try altering some of the code. You might ask yourself:
- What if my miner waited longer before going to a health well?
- What if my health nut was aware of where the nearest enemy was and tried to keep away?
- Can I change my aggressor to became a berserker?

The possibilities are endless! Go crazy and change your hero however you want. Just remember to track your changes with Git.

If you are looking for even more of a challenge, take a look at the *helpers.js* file and begin picking apart our helper methods. Is there any way you could adapt our path-finding algorithm and use a variant in your *hero.js* file? What other helper methods should be available to your hero that we did not include?


Your hero has the potential to behave in any way you decide. Every change you make could alter the outcome of the game. You can be a lone wolf or a team player. You can heal or you can hurt. It is all up to you.

## Testing and Training

You can still test your hero code locally! After you have [Node.js](https://nodejs.org) installed, there are two ways to do this:

### Option A: Check for code errors

- On the command line, navigate to your hero code directory.
- Type in the following commands:
```
npm install
npm test
```
If the tests pass, your code doesn't have any obvious errors.

### Option B: Have a test battle

#### Running the battle

- On the command line, navigate to your hero-starter directory.
- Type in the following command:
  ```
  node test-battle.js
  ```
This will run a test battle of only 15 turns which takes place on a 5x5 game board against a single enemy. The script will output what the board looks like at each turn, and the moves your hero tried to make.

#### Understanding the output
- Your hero will be denoted by the code "H00".
- The enemy will be denoted by the code "H01".
- Diamond mines will be denoted by "DXX" where the Xs are numbers.
- Health wells will be denoted by "WWW".

#### Can I commit changes to the test script?
Absolutely! We only use your *hero.js* and *helpers.js* files for the live game, so feel free to do whatever you like with the rest of the files.

## Game Rules

### Win Conditions

The game is decided in one of two ways:
  1. A team eliminates all of the other team's heroes or...
  2. After 1,250 turns, a team collects the most diamonds.

### Turns

These are the events that occur in one hero's turn, assuming the hero has some health left:

1. We take the direction that your hero wants to go (ie - the direction that your `move` function returned) and ask if it is a valid coordinate. If it is, we move your hero to that tile. If not, your hero stays put.
1. If the tile your hero wants to move to is...
   - ... unoccupied, your hero moves on to that tile.
   - ... a fallen hero, your hero will steal their soul.
   - ... a diamond mine, then your hero will capture the diamond mine, but will not move on to that tile. Additionally, your hero will receive 20 damage because diamond mines are perilous.
   - ... a health well, then your hero will receive 30 health, but will not move on to that tile.
   - ... an enemy hero, then your hero will deal 10 damage to the enemy hero, but will not move to that tile.
   - ... a friendly hero, then the friendly hero will receive 40 health, but your hero will not move on to that tile.
1. If your hero is still alive after moving, then your hero deals 20 damage to any enemy hero on an adjacent tile. This is in addition to the specific damage done by moving directly into an enemy.
1. After this, your hero's turn is over and we increment the game's turn and move on to the next hero.
