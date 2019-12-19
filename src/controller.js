'use strict';
import business from './business';

/**
 * Method that calls business module to get all the games.
 * @param {Object} request - Object containing request information
 * @param {Object} h - Object containint handler callback 
 * @returns {Object} Object HTTP response containing the games array object
 */
exports.getAllGames = (request, h) => {
  const registers = business.getAllGames();
  return h.response(registers);
};

/**
 * Method that calls business module to get a specific game identified by ID.
 * @param {Object} request - Object containing request information
 * @param {Object} h - Object containint handler callback 
 * @returns {Object} Object HTTP response containing game object
 */
exports.getGame = (request, h) => {
  const result = business.getGameById(request.params.id);
  if (result) {
    return h.response(result);
  } else {
    return h.response('Game not found').code(404);
  }
};
