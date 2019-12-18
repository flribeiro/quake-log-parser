'use strict';

import business from './business';

exports.getAllGames = (request, h) => {
  return `All Games!`;
};

exports.getGame = (request, h) => {
  return `Just the game #${request.params.id}`;
};

exports.postLog = async (request, h) => {
  return `Test`;
};
