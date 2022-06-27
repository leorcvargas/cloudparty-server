import { Request, Response } from 'express';

import { HttpStatus } from '@/_lib/http/httpStatus';
import { handler } from '@/_lib/http/handler';
import { DeleteGameServer } from '@/gameServer/application/useCases/deleteGameServer';

type Dependencies = {
  deleteGameServer: DeleteGameServer;
};

const deleteGameServerHandler = handler(
  ({ deleteGameServer }: Dependencies) =>
    async (req: Request, res: Response) => {
      const { id } = req.params;

      await deleteGameServer.execute({ id });

      res.sendStatus(HttpStatus.NO_CONTENT);
    },
);

export { deleteGameServerHandler };
