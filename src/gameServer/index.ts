import { makeModule } from '@/context';
import { toContainerValues } from '@/lib/di';
import { withSequelizeProvider } from '@/lib/sequelizeProvider';
import { asClass } from 'awilix';
import { CreateGameServer } from './application/useCases/createGameServer';
import { FindGameServers } from './application/useCases/findGameServers';
import { GameServerRepository } from './domain/gameServerRepository';
import {
  GameServerModel,
  initGameServerModel,
} from './infrastructure/data/gameServerModel';
import { SequelizeGameServerRepository } from './infrastructure/data/sequelizeGameServerRepository';
import { makeGameServerController } from './infrastructure/http/gameServerController';

type GameServerRegistry = {
  gameServerModel: typeof GameServerModel;
  gameServerRepository: GameServerRepository;
  createGameServer: CreateGameServer;
  findGameServers: FindGameServers;
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
    });

    build(makeGameServerController);
  },
);

export { gameServerModule };
export type { GameServerRegistry };
