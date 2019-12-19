'use strict';

/**
 * Class defining the Game model, to be used by the Parser
 */
export default class Game {
  /**
   * Class constructor
   * @param {Number} number - the ID of the game
   */
  constructor(number) {
    this.game = number;
    this.players = {
      name: [],
      numberOfKills: []
    };
    this.totalKills = 0;
  }

  /**
   * Method that receives the name of a new player and push it to the array of 
   * players if he's not yet there.
   * @param {String} name - Name of the player
   * @returns {Number} - The player's position on the array, or null if player
   * is already in the array
   */
  addPlayer(name) {
    if (!this.players.name.includes(name)) {
      let position = this.players.name.push(name);
      this.players.numberOfKills.push(0);
      return position--;
    }
    return null;
  }

  /**
   * Method that increases the kills score of a player.
   * @param {String} playerName - The name of the player to increment his kills score.
   */
  addKill(playerName) {
    const playerFound = this.players.name.indexOf(playerName);
    if (playerFound >= 0) {
      this.players.numberOfKills[playerFound] += 1;
    } else {
      const position = this.addPlayer(playerName);
      this.players.numberOfKills[position] += 1;
    }
  }

  /**
   * Method that decreases the kills score of a player.
   * @param {String} playerName - The name of the player to decrement his kills score.
   */
  removeKill(playerName) {
    const playerFound = this.players.name.indexOf(playerName);
    if (playerFound >= 0) {
      this.players.numberOfKills[playerFound] -= 1;
    } else {
      const position = this.addPlayer(playerName);
      this.players.numberOfKills[position] -= 1;
    }
  }

  /**
   * Method that intermediates the kills management. It receives the killer and 
   * the killed player names and add and remove his respective scores as needed.
   * It considers '<world>' as a neutral player, ignoring the increment of score
   * when it is the killer.
   * @param {String} playerName - The name of the player to increment his kills score.
   */
  registerKill(killerPlayer, killedPlayer) {
    this.totalKills++;
    if (killerPlayer !== '<world>') {
      this.addKill(killerPlayer);
    }
    this.removeKill(killedPlayer);
  }

  /**
   * Method that format the entity Game object response to the business layer.
   * @returns {Object} - The formatted Game object.
   */
  objectify() {
    this.players.name.splice(this.players.name.indexOf('<world>'), 1);

    const obj = {
      gameId: this.game,
      total_kills: this.totalKills,
      players: this.players.name,
      
    }
    
    let result = {};

    this.players.name.forEach((key, pos) => {
        result[key] = this.players.numberOfKills[pos];
    });

    obj.kills = result;

    return obj;
  }

  /**
   * Returns a readable representation of the object.
   * @returns {String} - The JSON representation of the Game object
   */
  stringify() {
    return JSON.stringify(this.objectify());
  }
}
