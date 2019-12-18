'use strict';

export default class Game {
  constructor(number) {
    this.game = number;
    this.players = {
      name: [],
      numberOfKills: []
    };
    this.totalKills = 0;
  }

  addPlayer(name) {
    if (!this.players.name.includes(name)) {
      let position = this.players.name.push(name);
      this.players.numberOfKills.push(0);
      return position--;
    }
    return null;
  }

  addKill(playerName) {
    const playerFound = this.players.name.indexOf(playerName);
    console.log('Playerfound killer', playerFound);
    if (playerFound >= 0) {
      this.players.numberOfKills[playerFound] += 1;
    } else {
      const position = this.addPlayer(playerName);
      this.players.numberOfKills[position] += 1;
    }
  }

  removeKill(playerName) {
    const playerFound = this.players.name.indexOf(playerName);
    console.log('Playerfound dead', playerFound);
    if (playerFound >= 0) {
      this.players.numberOfKills[playerFound] -= 1;
    } else {
      const position = this.addPlayer(playerName);
      this.players.numberOfKills[position] -= 1;
    }
  }

  registerKill(killerPlayer, killedPlayer) {
    this.totalKills++;
    if (killerPlayer !== '<world>') {
      this.addKill(killerPlayer);
    }
    this.removeKill(killedPlayer);
  }

  objectify() {
    const obj = {
      number: this.game,
      total_kills: this.totalKills,
      players: this.players.name,
      
    }
    
    let result = {};

    this.players.name.forEach((key, pos) => {
      result[key] = this.players.numberOfKills[pos]
    });

    obj.kills = result;

    return obj;
  }

  stringify() {
    return JSON.stringify(this.objectify());
  }
}
