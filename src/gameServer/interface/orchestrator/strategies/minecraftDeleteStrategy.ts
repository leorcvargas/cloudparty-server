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

  async delete(id: string, port: number): Promise<void> {
    const { body: service } = await this.k8sClient.getService('mc-vanilla-svc');

    if (!service.spec) {
      throw new Error('Missing service spec');
    }

    const newServicePorts = service.spec?.ports?.filter(
      (svcPort) => svcPort.port !== port,
    );

    service.spec = {
      ...service.spec,
      ports: newServicePorts,
    };

    const deploymentName =
      this.minecraftResourcesBuilder.buildDeploymentName(id);

    await Promise.all([
      this.k8sClient.patchServicePorts('mc-vanilla-svc', service),
      this.k8sClient.deleteDeployment(deploymentName),
    ]);
  }
}

export { MinecraftDeleteStrategy };
