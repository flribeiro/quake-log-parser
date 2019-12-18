'use strict';
import fs from 'fs';
import path from 'path';
import Game from './game/game';

const readAndParseLogFile = () => {
  const allGames = [];
  let gamesCount = 0;
  let currentGame = null;
  let logfile;
  try {
    logfile = fs.readFileSync(path.join(__dirname, './logfile/games.log'), 'utf8').toString().split('\n');
  } catch (err) {
    throw err;
  }
  
  logfile.forEach((line) => {
    if (line.includes('InitGame')) {
      if (currentGame) {
        allGames.push(currentGame);
      }
      gamesCount++;
      currentGame = new Game(gamesCount);
      let resultPlayerAnalyze = playerAnalyze(line);
      let resultKillAnalyze = killsAnalyze(line);
      if (resultPlayerAnalyze) {
        currentGame.addPlayer(resultPlayerAnalyze);
      }
      // TODO - O que fazer com resultKillAnalyze?
    }
  });
}

const playerAnalyze = (line) => {
  const regexNamePlayer = /(\sn\\)(\w*(\w|\s)+)/g;
  const arrayMatches = regexNamePlayer.exec(line);
  if (arrayMatches && arrayMatches.length > 1) {
    return arrayMatches[2];
  } else {
    return null;
  }
}

const killsAnalyze = (line) => {
  const regexKills = /\d:\s(.*)\skilled\s(.*)\sby/g;
  const arrayMatches = regexKills.exec(line);
  if (arrayMatches && arrayMatches.length > 2) {
    return {
      killed: arrayMatches[1],
      killer: arrayMatches[2]
    }
  } else {
    return null;
  }
};

readAndParseLogFile();
