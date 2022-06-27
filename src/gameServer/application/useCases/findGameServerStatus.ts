import { UseCase } from '@/_lib/useCase';
import { OrchestratorGateway } from '@/gameServer/infrastructure/orchestrator/orchestratorGateway';

type Input = { id: string };

type Output = 'ONLINE' | 'BOOTING' | 'OFFLINE';

type Dependencies = {
  orchestratorGateway: OrchestratorGateway;
};

class FindGameServerStatus implements UseCase<Input, Output> {
  private readonly orchestratorGateway: OrchestratorGateway;

  constructor(deps: Dependencies) {
    this.orchestratorGateway = deps.orchestratorGateway;
  }

  execute({ id }: Input): Promise<Output> {
    return this.orchestratorGateway.findGameServerStatus(id);
  }
}

export { FindGameServerStatus };
