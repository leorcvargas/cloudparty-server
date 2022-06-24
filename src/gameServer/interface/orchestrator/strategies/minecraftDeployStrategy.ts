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
    const { body: service } = await this.k8sClient.getService('mc-vanilla-svc');

    const changedService = this.minecraftResourcesBuilder.buildService(
      id,
      port,
      service,
    );
    const deployment = this.minecraftResourcesBuilder.buildDeployment(id);

    await this.k8sClient.patchServicePorts('mc-vanilla-svc', changedService);
    await this.k8sClient.createDeployment(deployment);
  }
}

export { MinecraftDeployStrategy };
