import { K8sClient } from './client';
import { OrchestratorInterface } from './orchestratorInterface';

type Dependencies = {
  k8sClient: K8sClient;
};

class K8sOrchestratorInterface implements OrchestratorInterface {
  private readonly k8sClient: K8sClient;

  constructor(deps: Dependencies) {
    this.k8sClient = deps.k8sClient;
  }

  async getGameServerStatus(
    gameServerId: string,
  ): Promise<'ONLINE' | 'BOOTING' | 'OFFLINE'> {
    const deployment = await this.k8sClient.findDeploymentByLabel(
      'gameServerId',
      gameServerId,
    );

    if (!deployment) {
      return 'OFFLINE';
    }

    const { status } = deployment;

    if (status?.readyReplicas && status?.readyReplicas > 0) {
      return 'ONLINE';
    }

    return 'BOOTING';
  }
}

export { K8sOrchestratorInterface };
