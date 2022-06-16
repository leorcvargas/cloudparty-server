import { Request, Response } from 'express';
import * as Joi from 'types-joi';

import { CreateGameServer } from '@/gameServer/application/useCases/createGameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { HttpStatus } from '@/lib/http/httpStatus';
import { makeValidator } from '@/lib/http/validation/Validator';
import { handler } from '@/lib/http/handler';

type Dependencies = {
  createGameServer: CreateGameServer;
};

const { getBody } = makeValidator({
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid(GameServerType.Minecraft).required(),
  }).required(),
});

const createGameServerHandler = handler(
  ({ createGameServer }: Dependencies) =>
    async (req: Request, res: Response) => {
      const { name, type } = getBody(req);

      const articleId = await createGameServer.execute({ name, type });

      res.status(HttpStatus.CREATED).json({ id: articleId });
    },
);

export { createGameServerHandler };
