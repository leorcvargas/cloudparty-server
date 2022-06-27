import { Router } from 'express';

import { createGameServerHandler } from './createGameServerHandler';
import { deleteGameServerHandler } from './deleteGameServerHandler';
import { findGameServersHandler } from './findGameServersHandler';
import { findGameServerStatusHandler } from './findGameServerStatusHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeGameServerController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/game-server', createGameServerHandler);
  router.get('/game-server', findGameServersHandler);
  router.get('/game-server/:id/status', findGameServerStatusHandler);
  router.delete('/game-server/:id', deleteGameServerHandler);

  apiRouter.use(router);
};

export { makeGameServerController };
