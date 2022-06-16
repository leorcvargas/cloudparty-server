import { Router } from 'express';

import { createGameServerHandler } from './CreateGameServerHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeGameServerController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/game-server', createGameServerHandler);

  apiRouter.use(router);
};

export { makeGameServerController };
