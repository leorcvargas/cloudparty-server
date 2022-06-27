import { Request, Response } from 'express';

import { HttpStatus } from '@/_lib/http/httpStatus';
import { handler } from '@/_lib/http/handler';
import { FindGameServers } from '@/gameServer/application/useCases/findGameServers';

type Dependencies = {
  findGameServers: FindGameServers;
};

const findGameServersHandler = handler(
  ({ findGameServers }: Dependencies) =>
    async (req: Request, res: Response) => {
      const gameServers = await findGameServers.execute();

      res.status(HttpStatus.CREATED).json(gameServers);
    },
);

export { findGameServersHandler };
