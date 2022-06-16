import { GameServer } from '@/gameServer/domain/gameServer';
import { UseCase } from '@/_lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { Configuration } from '@/config';
import { OrchestratorDeployContext } from '@/gameServer/interface/orchestrator/orchestratorDeployContext';
import { OrchestratorDeployStrategy } from '@/gameServer/interface/orchestrator/strategies/orchestratorDeployStrategy';

type Input = undefined;

type Output = GameServer[];

type Dependencies = {
  gameServerRepository: GameServerRepository;
  config: Configuration;
  orchestratorDeployContext: OrchestratorDeployContext;
  minecraftDeployStrategy: OrchestratorDeployStrategy;
};

class FindGameServers implements UseCase<Input, Output> {
  private readonly gameServerRepository: GameServerRepository;

  constructor(deps: Dependencies) {
    this.gameServerRepository = deps.gameServerRepository;
  }

  async execute(): Promise<Output> {
    return this.gameServerRepository.findAll();
  }
}

export { FindGameServers };
