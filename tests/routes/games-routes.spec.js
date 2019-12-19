'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
import { init } from '../../src/server';

describe('Testing the Quake log parser API', () => {
  let server;

  beforeEach(async () => {
    server = await init();  
  });

  afterEach(async () => {
    await server.stop();
  });

  describe('Getting all the games', () => {
    it('should return an array with 20 games', (done) => {
      const options = {
        method: 'GET',
        url: '/games'
      };
      
      server.inject(options, response => {
        let body = JSON.parse(response.payload);
        expect(response.statusCode).to.be.equal(200);
        expect(body.lenght).to.be.equal(20);
        done();
      });
    });
  });

  describe('Getting a unique game', () => {
    it('should return a game corresponding to the ID used as param', (done) => {
      const options = {
        method: 'GET',
        url: '/games/13'
      };
      
      server.inject(options, response => {
        let body = JSON.parse(response.payload);
        expect(response.statusCode).to.be.equal(200);
        expect(body).to.have.property('gameId', 13);
        expect(body).to.have.property('total_games', 6);
        expect(body.players).to.be.an('Array');
        expect(body.players).to.have.length.of(7);
        done();
      });
    });

    it('should return 404 HTTP Error if game with specified ID doesnt exists', (done) => {
      const options = {
        method: 'GET',
        url: '/games/333'
      };
      
      server.inject(options, response => {
        let body = JSON.parse(response.payload);
        expect(response.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});