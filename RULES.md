
# JavaScript Fight Club - Hero Starter

## Rules

If you want to update your hero, you will benefit from knowing a little more about the rules of the game. Below, you will find detailed descriptions of the different aspects of the game logic.

### Win Conditions

The game is decided in one of two ways:
  1. A team eliminates all of the other team's heroes or...
  2. After 1,250 turns, a team collects the most diamonds.

Your hero has the potential to behave in any way you decide, either by re-writing the code yourself or simply by replacing your hero type with another pre-defined hero type. Every change you make could alter the outcome of the game. If you program your hero to be a Selfish Diamond Miner, for example, then you will likely rank high in the diamond mines captured category, but will not be helping your team, possibly causing a loss in your stats. The win conditions are important to keep in mind as you think about how you want to program your hero.

### Turns

Several things happen on each turn. Let's take a single turn from your hero as an example, and walk through the steps.

Let's assume the game isn't over yet, and your hero is alive.

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

### Statistics

After the game is over, we keep track of a number of statistics that you can view at the [JavaScript Fight Club](https://jsfight.club) website.