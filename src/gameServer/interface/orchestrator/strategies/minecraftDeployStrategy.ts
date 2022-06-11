import { K8sClient } from '../client';
import { OrchestratorDeployStrategy } from './orchestratorDeployStrategy';

type Dependencies = {
  k8sClient: K8sClient;
};

class MinecraftDeployStrategy implements OrchestratorDeployStrategy {
  constructor(private readonly deps: Dependencies) {}

  deploy(id: string, port: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { MinecraftDeployStrategy };
