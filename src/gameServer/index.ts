import { makeModule } from '@/context';
import { toContainerValues } from '@/lib/di';
import { withSequelizeProvider } from '@/lib/sequelizeProvider';
import { asClass, asValue } from 'awilix';
import { CreateGameServer } from './application/useCases/createGameServer';
import { GameServerRepository } from './domain/gameServerRepository';
import {
  GameServerModel,
  initGameServerModel,
} from './infrastructure/data/gameServerModel';
import { SequelizeGameServerRepository } from './infrastructure/data/sequelizeGameServerRepository';
import { K8sClient } from './interface/k8s/client';
import * as k8s from '@kubernetes/client-node';

type GameServerRegistry = {
  gameServerModel: typeof GameServerModel;
  gameServerRepository: GameServerRepository;
  createGameServer: CreateGameServer;
  k8sClient: K8sClient;
  k8sAppsV1Api: k8s.AppsV1Api;
  k8sCoreV1Api: k8s.CoreV1Api;
};

const gameServerModule = makeModule(
  'gameServer',
  async ({ container: { register, build } }) => {
    const models = await build(
      withSequelizeProvider({
        gameServerModel: initGameServerModel,
      }),
    );

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    const k8sCoreV1Api = kc.makeApiClient(k8s.CoreV1Api);

    register({
      ...toContainerValues(models),
      gameServerRepository: asClass(SequelizeGameServerRepository),
      createGameServer: asClass(CreateGameServer),
      k8sClient: asClass(K8sClient),
      k8sAppsV1Api: asValue(k8sAppsV1Api),
      k8sCoreV1Api: asValue(k8sCoreV1Api),
    });
  },
);

export { gameServerModule };
export type { GameServerRegistry };
