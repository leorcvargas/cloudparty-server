import { makeModule } from '@/context';
import { toContainerValues } from '@/lib/di';
import { withSequelizeProvider } from '@/lib/sequelizeProvider';
import { asClass } from 'awilix';
import { CreateGameServer } from './application/useCases/createGameServer';
import { GameServerRepository } from './domain/gameServerRepository';
import {
  GameServerModel,
  initGameServerModel,
} from './infrastructure/data/gameServerModel';
import { SequelizeGameServerRepository } from './infrastructure/data/sequelizeGameServerRepository';

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
    });
  },
);

type GameServerRegistry = {
  gameServerModel: typeof GameServerModel;
  gameServerRepository: GameServerRepository;
  createGameServer: CreateGameServer;
};

export { gameServerModule };
export type { GameServerRegistry };
