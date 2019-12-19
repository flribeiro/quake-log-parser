'use strict';

import LogParser from './models/logparser';

const parser = new LogParser();

/**
 * Method that returns all games found by the parser
 * @returns {Array} object containing all the games
 */
exports.getAllGames = () => {
  const result = parser.allGames.map(game => { return game.objectify(); });
  return result;
};

/**
 * Method that query the parser's result by ID of the game and returns a game if it found one
 * @returns {Object} with a game, if found.
 */
exports.getGameById = (id) => {
  let result;
  parser.allGames.filter(game => { 
    if (game.game === id) {
      result = game.objectify()
    }
  });

  return result;
}