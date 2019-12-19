'use strict';
import fs from 'fs';
import path from 'path';
import Game from './game';

/**
 * Class that defines de LogParser model, responsible for read the log file, 
 * parse it, and organize all the found games (including informations about each
 * game) in an array
 */
export default class LogParser {
  /**
   * Class constructor
   */
  constructor () {
    this.allGames = [];
    this.gamesCount = 0;
    this.currentGame = null;
    this.currentLine = 0;
    this.readAndParseLogFile();
  }

  /**
   * Method responsible for the orchestration of the parsing. 
   * It reads the file and split it in separated lines that will be analyzed one
   * by one. This analysis is made in a simple way:
   * a) Each time the expression 'InitGame' is found, a Game is finished and 
   *    stored in the array called allGames;
   * b) gamesCount is incremented to obtain the next game ID (that is created 
   *    short thereafter;
   * c) About the creation of the new Game, each following line is analyzed by 
   *    two methods that searches for new players and for kills informations.
   * d) If the methods mentioned on 'c' item had find something, the methods of
   *    Games class are called, for add players to the game, or to update kills
   *    scores, as needed.
   */
  readAndParseLogFile() {
    let logfile;
    try {
      logfile = fs.readFileSync(path.join(__dirname, '../logfile/games.log'), 'utf8').toString().split('\n');
    } catch (err) {
      throw err;
    }
    
    logfile.forEach((line) => {
      if (line.includes('InitGame')) {
        if (this.currentGame) {
          this.allGames.push(this.currentGame);
        }
        this.gamesCount++;
        this.currentGame = new Game(this.gamesCount);
      }

      let resultPlayerAnalyze = this.playerAnalyze(line);
      let resultKillAnalyze = this.killsAnalyze(line);
      if (resultPlayerAnalyze) {
        this.currentGame.addPlayer(resultPlayerAnalyze);
      }
      if (resultKillAnalyze) {
        this.currentGame.registerKill(resultKillAnalyze.killer, resultKillAnalyze.killed);
      }
    });
  }

  /**
   * Method that receives one line of the log file to parse, looking for new 
   * players. It uses RegEx (regular expression) to identify a new player name 
   * on a game. When it find a match of this pattern in the line, it return the 
   * found name to the caller.
   * @param {String} line - Any line of the log file
   * @returns {String} containing the name of the player found, or null if none
   * was found
   */
  playerAnalyze(line) {
    const regexNamePlayer = /(\sn\\)(\w*(\w|\s)+)/g;
    const arrayMatches = regexNamePlayer.exec(line);
    if (arrayMatches && arrayMatches.length > 1) {
      return arrayMatches[2];
    } else {
      return null;
    }
  }

  /**
   * Method that receives one line of the log file to parse, looking for kills 
   * informations. It uses RegEx (regular expression) to identify the pattern
   * 'someone killed someone' on the text of the line, and when it 
   * find a match of this pattern, it returns the both names (killer and killed)
   * to the caller in an object form.
   * @param {String} line - Any line of the log file
   * @returns {Object} containing key: value objects, being the killed and the
   * kiler names.
   */
  killsAnalyze(line) {
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
  }
}
