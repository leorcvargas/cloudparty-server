import { Request, Response } from 'express';

import { HttpStatus } from '@/lib/http/httpStatus';
import { handler } from '@/lib/http/handler';
import { FindGameServers } from '@/gameServer/application/useCases/findGameServers';

type Dependencies = {
  findGameServers: FindGameServers;
};

const findGameServerHandler = handler(
  ({ findGameServers }: Dependencies) =>
    async (req: Request, res: Response) => {
      const gameServers = await findGameServers.execute();

      res.status(HttpStatus.CREATED).json(gameServers);
    },
);

export { findGameServerHandler };
