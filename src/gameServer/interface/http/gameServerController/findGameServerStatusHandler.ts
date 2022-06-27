import { Request, Response } from 'express';

import { HttpStatus } from '@/_lib/http/httpStatus';
import { handler } from '@/_lib/http/handler';
import { FindGameServerStatus } from '@/gameServer/application/useCases/findGameServerStatus';

type Dependencies = {
  findGameServerStatus: FindGameServerStatus;
};

const findGameServerStatusHandler = handler(
  ({ findGameServerStatus }: Dependencies) =>
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const status = await findGameServerStatus.execute({ id });

      res.status(HttpStatus.OK).json({ status });
    },
);

export { findGameServerStatusHandler };
