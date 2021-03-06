import { Request, Response } from 'express';
import * as Joi from 'types-joi';

import { CreateGameServer } from '@/gameServer/application/useCases/createGameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { HttpStatus } from '@/_lib/http/httpStatus';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';

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

      const id = await createGameServer.execute({ name, type });

      res.status(HttpStatus.CREATED).json({ id });
    },
);

export { createGameServerHandler };
