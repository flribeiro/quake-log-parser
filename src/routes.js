import controller from './controller';
import Joi from '@hapi/joi';

const Routes = [
  {
    method: 'GET',
    path: '/games',
    options: {
      tags: ['api'],
      handler: controller.getAllGames
    }
  }, {
    method: 'GET',
    path: '/games/{id}',
    options: {
      tags: ['api'],
  
      handler: controller.getGame
    }
  }, {
    method: ['POST', 'GET'],
    path: '/log',
    options: {
      tags: ['api'],
  
      handler: controller.postLog
    }
  }
]

export default Routes;