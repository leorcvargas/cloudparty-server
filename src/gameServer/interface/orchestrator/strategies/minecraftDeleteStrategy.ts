import { OrchestratorResourcesBuilder } from '../builders/orchestratorResourcesBuilder';
import { K8sClient } from '../client';
import { OrchestratorDeleteStrategy } from './orchestratorDeleteStrategy';

type Dependencies = {
  k8sClient: K8sClient;
  minecraftResourcesBuilder: OrchestratorResourcesBuilder;
};

class MinecraftDeleteStrategy implements OrchestratorDeleteStrategy {
  private readonly k8sClient: K8sClient;
  private readonly minecraftResourcesBuilder: OrchestratorResourcesBuilder;

  constructor(deps: Dependencies) {
    this.k8sClient = deps.k8sClient;
    this.minecraftResourcesBuilder = deps.minecraftResourcesBuilder;
  }

  async delete(id: string): Promise<void> {
    const serviceName = this.minecraftResourcesBuilder.buildServiceName(id);
    const deploymentName =
      this.minecraftResourcesBuilder.buildDeploymentName(id);

    await Promise.all([
      this.k8sClient.deleteService(serviceName),
      this.k8sClient.deleteDeployment(deploymentName),
    ]);
  }
}

export { MinecraftDeleteStrategy };
