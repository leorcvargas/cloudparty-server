import { Configuration } from '@/config';
import { OrchestratorResourcesBuilder } from '../builders/orchestratorResourcesBuilder';
import { K8sClient } from '../client';
import { OrchestratorDeployStrategy } from './orchestratorDeployStrategy';

type Dependencies = {
  k8sClient: K8sClient;
  minecraftResourcesBuilder: OrchestratorResourcesBuilder;
  config: Configuration;
};

class MinecraftDeployStrategy implements OrchestratorDeployStrategy {
  private readonly k8sClient: K8sClient;
  private readonly minecraftResourcesBuilder: OrchestratorResourcesBuilder;
  private readonly config: Configuration;

  constructor(deps: Dependencies) {
    this.k8sClient = deps.k8sClient;
    this.minecraftResourcesBuilder = deps.minecraftResourcesBuilder;
    this.config = deps.config;
  }

  async deploy(id: string, port: number): Promise<void> {
    const service = this.minecraftResourcesBuilder.buildService(id, port);
    const deployment = this.minecraftResourcesBuilder.buildDeployment(id);

    await Promise.all([
      this.k8sClient.patchServiceAddPort({
        name: this.config.orchestrator.service.name,
        port,
        targetPort: port,
        portName: service.metadata!.name!,
        protocol: 'TCP',
      }),
      this.k8sClient.patchConfigMapAddData(
        this.config.orchestrator.service.configMapName,
        port,
        `${this.k8sClient.namespace}/${service.metadata!.name!}:${port}`,
      ),
      this.k8sClient.createService(service),
      this.k8sClient.createDeployment(deployment),
    ]);
  }
}

export { MinecraftDeployStrategy };
