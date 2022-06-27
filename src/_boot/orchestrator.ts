import * as k8sClientNode from '@kubernetes/client-node';
import { asClass, asValue } from 'awilix';

import { makeModule } from '@/context';
import { K8sClient } from '@/gameServer/infrastructure/orchestrator/client';
import { OrchestratorDeployContext } from '@/gameServer/infrastructure/orchestrator/orchestratorDeployContext';
import { MinecraftDeployStrategy } from '@/gameServer/infrastructure/orchestrator/strategies/minecraftDeployStrategy';
import { MinecraftResourcesBuilder } from '@/gameServer/infrastructure/orchestrator/builders/minecraftResourcesBuilder';
import { OrchestratorDeleteContext } from '@/gameServer/infrastructure/orchestrator/orchestratorDeleteContext';
import { MinecraftDeleteStrategy } from '@/gameServer/infrastructure/orchestrator/strategies/minecraftDeleteStrategy';
import { K8sOrchestratorGateway } from '@/gameServer/infrastructure/orchestrator/k8sOrchestratorGateway';
import { OrchestratorGateway } from '@/gameServer/infrastructure/orchestrator/orchestratorGateway';

type OrchestratorConfig = {
  orchestrator: {
    kubeConfig: string;
  };
};

type OrchestratorRegistry = {
  k8sAppsV1Api: k8sClientNode.AppsV1Api;
  k8sCoreV1Api: k8sClientNode.CoreV1Api;
  k8sClient: K8sClient;
  orchestratorDeployContext: OrchestratorDeployContext;
  orchestratorDeleteContext: OrchestratorDeleteContext;
  minecraftDeployStrategy: MinecraftDeployStrategy;
  minecraftDeleteStrategy: MinecraftDeleteStrategy;
  minecraftResourcesBuilder: MinecraftResourcesBuilder;
  orchestratorGateway: OrchestratorGateway;
};

const orchestrator = makeModule(
  'orchestrator',
  async ({ container: { register } }) => {
    const kc = new k8sClientNode.KubeConfig();
    kc.loadFromDefault();
    const k8sAppsV1Api = kc.makeApiClient(k8sClientNode.AppsV1Api);
    const k8sCoreV1Api = kc.makeApiClient(k8sClientNode.CoreV1Api);

    register({
      k8sAppsV1Api: asValue(k8sAppsV1Api),
      k8sCoreV1Api: asValue(k8sCoreV1Api),
      k8sClient: asClass(K8sClient),
      orchestratorDeployContext: asClass(OrchestratorDeployContext),
      orchestratorDeleteContext: asClass(OrchestratorDeleteContext),
      minecraftDeployStrategy: asClass(MinecraftDeployStrategy),
      minecraftDeleteStrategy: asClass(MinecraftDeleteStrategy),
      minecraftResourcesBuilder: asClass(MinecraftResourcesBuilder),
      orchestratorGateway: asClass(K8sOrchestratorGateway),
    });
  },
);

export { orchestrator };
export type { OrchestratorConfig, OrchestratorRegistry };
