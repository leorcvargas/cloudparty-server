import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { UseCase } from '@/lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { K8sClient } from '@/gameServer/interface/orchestrator/client';
import { Configuration } from '@/config';

interface Input {
  name: string;
  type: GameServerType;
}

type Output = GameServer;

type Dependencies = {
  gameServerRepository: GameServerRepository;
  k8sClient: K8sClient;
  config: Configuration;
};

class CreateGameServer implements UseCase<Input, Output> {
  constructor(private readonly deps: Dependencies) {}

  public async execute(input: Input): Promise<Output> {
    const gameServer = new GameServer({
      ...input,
      hostname: this.deps.config.http.host,
      // TODO: Get an available port instead of random bs
      port: Math.ceil(Math.random() * 30000) + 10000,
    });

    await this.deps.k8sClient.createService({
      id: gameServer.id,
    });
    await this.deps.k8sClient.createDeployment({
      id: gameServer.id,
    });

    await this.deps.gameServerRepository.save(gameServer);

    return gameServer;
  }
}

export { CreateGameServer };
