import { Configuration } from '@/config';
import { OrchestratorResourcesBuilder } from '../builders/orchestratorResourcesBuilder';
import { K8sClient } from '../client';
import { OrchestratorDeleteStrategy } from './orchestratorDeleteStrategy';

type Dependencies = {
  k8sClient: K8sClient;
  minecraftResourcesBuilder: OrchestratorResourcesBuilder;
  config: Configuration;
};

class MinecraftDeleteStrategy implements OrchestratorDeleteStrategy {
  private readonly k8sClient: K8sClient;
  private readonly minecraftResourcesBuilder: OrchestratorResourcesBuilder;
  private readonly config: Configuration;

  constructor(deps: Dependencies) {
    this.k8sClient = deps.k8sClient;
    this.minecraftResourcesBuilder = deps.minecraftResourcesBuilder;
    this.config = deps.config;
  }

  async delete(id: string, port: number): Promise<void> {
    const { body: service } = await this.k8sClient.getService(
      this.config.orchestrator.service.name,
    );
    if (!service.spec) {
      throw new Error('Missing service spec');
    }

    const servicePortIndex = service.spec.ports!.findIndex(
      (svcPort) => svcPort.port === port,
    );

    const deploymentName =
      this.minecraftResourcesBuilder.buildDeploymentName(id);
    const serviceName = this.minecraftResourcesBuilder.buildServiceName(id);

    await Promise.all([
      this.k8sClient.patchConfigMapDeleteData(
        this.config.orchestrator.service.configMapName,
        port,
      ),
      this.k8sClient.patchServiceDeletePort(
        this.config.orchestrator.service.name,
        servicePortIndex,
      ),
      this.k8sClient.deleteDeployment(deploymentName),
      this.k8sClient.deleteService(serviceName),
    ]);
  }
}

export { MinecraftDeleteStrategy };
