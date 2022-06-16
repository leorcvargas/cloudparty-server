import { OrchestratorResourcesBuilder } from '../builders/orchestratorResourcesBuilder';
import { K8sClient } from '../client';
import { OrchestratorDeployStrategy } from './orchestratorDeployStrategy';

type Dependencies = {
  k8sClient: K8sClient;
  minecraftResourcesBuilder: OrchestratorResourcesBuilder;
};

class MinecraftDeployStrategy implements OrchestratorDeployStrategy {
  private readonly k8sClient: K8sClient;
  private readonly minecraftResourcesBuilder: OrchestratorResourcesBuilder;

  constructor(deps: Dependencies) {
    this.k8sClient = deps.k8sClient;
    this.minecraftResourcesBuilder = deps.minecraftResourcesBuilder;
  }

  async deploy(id: string, port: number): Promise<void> {
    const service = this.minecraftResourcesBuilder.buildService(id, port);
    const deployment = this.minecraftResourcesBuilder.buildDeployment(id);

    await Promise.all([
      this.k8sClient.createService(service),
      this.k8sClient.createDeployment(deployment),
    ]);
  }
}

export { MinecraftDeployStrategy };
