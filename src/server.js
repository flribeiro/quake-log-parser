'use strict';

import Hapi from 'hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Auth from 'hapi-auth-jwt';
import Routes from './routes';
import Package from '../package';

const init = async () => {

  const server = Hapi.server({
      port: 8080,
      host: 'localhost'
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Quake Log game parser and API',
          version: Package.version
        }
      }
    }
  ])

  
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.error(err);
  }
  
  await server.route(Routes);
};

process.on('unhandledRejection', (err) => {

  console.error(err);
  process.exit(1);
});

init();
