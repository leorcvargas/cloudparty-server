import { GameServerType } from '@/gameServer/domain/gameServerType';
import { UseCase } from '@/_lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { OrchestratorDeleteContext } from '@/gameServer/interface/orchestrator/orchestratorDeleteContext';
import { OrchestratorDeleteStrategy } from '@/gameServer/interface/orchestrator/strategies/orchestratorDeleteStrategy';

interface Input {
  id: string;
}

type Output = string;

type Dependencies = {
  gameServerRepository: GameServerRepository;
  orchestratorDeleteContext: OrchestratorDeleteContext;
  minecraftDeleteStrategy: OrchestratorDeleteStrategy;
};

class DeleteGameServer implements UseCase<Input, Output> {
  private readonly minecraftDeleteStrategy: OrchestratorDeleteStrategy;
  private readonly orchestratorDeleteContext: OrchestratorDeleteContext;
  private readonly gameServerRepository: GameServerRepository;

  constructor(deps: Dependencies) {
    this.minecraftDeleteStrategy = deps.minecraftDeleteStrategy;
    this.orchestratorDeleteContext = deps.orchestratorDeleteContext;
    this.gameServerRepository = deps.gameServerRepository;
  }

  public async execute(input: Input): Promise<Output> {
    const { id } = input;

    const gameServer = await this.gameServerRepository.findById(id);

    if (!gameServer) {
      return id;
    }

    switch (gameServer.type) {
      case GameServerType.Minecraft: {
        this.orchestratorDeleteContext.setStrategy(
          this.minecraftDeleteStrategy,
        );
        break;
      }
      default: {
        throw new Error('GameServerType not implemented');
      }
    }

    await this.orchestratorDeleteContext.execute(gameServer.id);
    await this.gameServerRepository.delete(id);

    return id;
  }
}

export { DeleteGameServer };
