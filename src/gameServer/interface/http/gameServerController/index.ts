import { Router } from 'express';

import { createGameServerHandler } from './createGameServerHandler';
import { deleteGameServerHandler } from './deleteGameServerHandler';
import { findGameServerHandler } from './findGameServerHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeGameServerController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/game-server', createGameServerHandler);
  router.get('/game-server', findGameServerHandler);
  router.delete('/game-server/:id', deleteGameServerHandler);

  apiRouter.use(router);
};

export { makeGameServerController };
