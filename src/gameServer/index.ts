import { makeModule } from '@/context';
import { toContainerValues } from '@/_lib/di';
import { withSequelizeProvider } from '@/_lib/sequelizeProvider';
import { asClass } from 'awilix';
import { CreateGameServer } from './application/useCases/createGameServer';
import { DeleteGameServer } from './application/useCases/deleteGameServer';
import { FindGameServers } from './application/useCases/findGameServers';
import { FindGameServerStatus } from './application/useCases/findGameServerStatus';
import { GameServerRepository } from './domain/gameServerRepository';
import {
  GameServerModel,
  initGameServerModel,
} from './infrastructure/data/gameServerModel';
import { SequelizeGameServerRepository } from './infrastructure/data/sequelizeGameServerRepository';
import { makeGameServerController } from './interface/http/gameServerController';

type GameServerRegistry = {
  gameServerModel: typeof GameServerModel;
  gameServerRepository: GameServerRepository;
  createGameServer: CreateGameServer;
  findGameServers: FindGameServers;
  findGameServerStatus: FindGameServerStatus;
  deleteGameServer: DeleteGameServer;
};

const gameServerModule = makeModule(
  'gameServer',
  async ({ container: { register, build } }) => {
    const models = await build(
      withSequelizeProvider({
        gameServerModel: initGameServerModel,
      }),
    );

    register({
      ...toContainerValues(models),
      gameServerRepository: asClass(SequelizeGameServerRepository),
      createGameServer: asClass(CreateGameServer),
      findGameServers: asClass(FindGameServers),
      findGameServerStatus: asClass(FindGameServerStatus),
      deleteGameServer: asClass(DeleteGameServer),
    });

    build(makeGameServerController);
  },
);

export { gameServerModule };
export type { GameServerRegistry };
