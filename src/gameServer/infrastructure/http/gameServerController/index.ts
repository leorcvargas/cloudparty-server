import { Router } from 'express';

import { createGameServerHandler } from './createGameServerHandler';
import { findGameServerHandler } from './findGameServerHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeGameServerController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/game-server', createGameServerHandler);
  router.get('/game-server', findGameServerHandler);

  apiRouter.use(router);
};

export { makeGameServerController };
