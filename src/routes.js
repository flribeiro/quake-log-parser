'use strict';

import controller from './controller';
// import Joi from '@hapi/joi';
const Joi = require('@hapi/joi');

const Routes = [
  {
    method: 'GET',
    path: '/games',
    options: {
      handler: controller.getAllGames,
      description: 'Get all games',
      notes: 'Returns all games found in the log file',
      tags: ['api']
    }
  }, {
    method: 'GET',
    path: '/games/{id}',
    options: {
      handler: controller.getGame,
      description: 'Get game',
      notes: 'Get the unique game specified by the ID on path param',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number().description('ID of the game to get').required()
        })
      }
    }
  }
]

export default Routes;