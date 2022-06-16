import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { UseCase } from '@/lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { Configuration } from '@/config';
import { OrchestratorDeployContext } from '@/gameServer/interface/orchestrator/orchestratorDeployContext';
import { OrchestratorDeployStrategy } from '@/gameServer/interface/orchestrator/strategies/orchestratorDeployStrategy';

interface Input {
  name: string;
  type: GameServerType;
}

type Output = string;

type Dependencies = {
  gameServerRepository: GameServerRepository;
  config: Configuration;
  orchestratorDeployContext: OrchestratorDeployContext;
  minecraftDeployStrategy: OrchestratorDeployStrategy;
};

class CreateGameServer implements UseCase<Input, Output> {
  private readonly config: Configuration;
  private readonly minecraftDeployStrategy: OrchestratorDeployStrategy;
  private readonly orchestratorDeployContext: OrchestratorDeployContext;
  private readonly gameServerRepository: GameServerRepository;

  constructor(deps: Dependencies) {
    this.minecraftDeployStrategy = deps.minecraftDeployStrategy;
    this.orchestratorDeployContext = deps.orchestratorDeployContext;
    this.gameServerRepository = deps.gameServerRepository;
    this.config = deps.config;
  }

  public async execute(input: Input): Promise<Output> {
    const port = await this.getAvailablePort();
    const id = this.gameServerRepository.getNextId();

    const gameServer = new GameServer({
      ...input,
      id,
      port,
      hostname: this.config.http.host,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    switch (input.type) {
      case GameServerType.Minecraft: {
        this.orchestratorDeployContext.setStrategy(
          this.minecraftDeployStrategy,
        );
        break;
      }
      default: {
        throw new Error('GameServerType not implemented');
      }
    }

    await this.orchestratorDeployContext.execute(
      gameServer.id,
      gameServer.port,
    );
    await this.gameServerRepository.save(gameServer);

    return id;
  }

  private async getAvailablePort(): Promise<number> {
    const port = Math.floor(Math.random() * 2768) + 30000;

    const countSamePort = await this.gameServerRepository.countByPort(port);
    const isPortAvailable = countSamePort === 0;

    if (isPortAvailable) {
      return port;
    }

    return this.getAvailablePort();
  }
}

export { CreateGameServer };
