import business from './business';

exports.getAllGames = (request, h) => {
  return `All Games!`;
};

exports.getGame = (request, h) => {
  return `Just the game #${request.params.id}`;
};

exports.postLog = (request, h) => {
  return `Post the path of the file to load.`
};