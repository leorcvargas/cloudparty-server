import { OrchestratorResourcesBuilder } from '../builders/orchestratorResourcesBuilder';
import { K8sClient } from '../client';
import { OrchestratorDeployStrategy } from './orchestratorDeployStrategy';

type Dependencies = {
  k8sClient: K8sClient;
  minecraftResourcesBuilder: OrchestratorResourcesBuilder;
};

class MinecraftDeployStrategy implements OrchestratorDeployStrategy {
  constructor(private readonly deps: Dependencies) {}

  async deploy(id: string, port: number): Promise<void> {
    const service = this.deps.minecraftResourcesBuilder.buildService(id, port);
    const deployment = this.deps.minecraftResourcesBuilder.buildDeployment(id);

    await Promise.all([
      this.deps.k8sClient.createService(service),
      this.deps.k8sClient.createDeployment(deployment),
    ]);
  }
}

export { MinecraftDeployStrategy };
