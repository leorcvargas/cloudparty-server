import * as k8sClientNode from '@kubernetes/client-node';
import { asClass, asValue } from 'awilix';

import { makeModule } from '@/context';
import { K8sClient } from '@/gameServer/interface/orchestrator/client';
import { OrchestratorDeployContext } from '@/gameServer/interface/orchestrator/orchestratorDeployContext';
import { MinecraftDeployStrategy } from '@/gameServer/interface/orchestrator/strategies/minecraftDeployStrategy';
import { MinecraftResourcesBuilder } from '@/gameServer/interface/orchestrator/builders/minecraftResourcesBuilder';

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
  minecraftDeployStrategy: MinecraftDeployStrategy;
  minecraftResourcesBuilder: MinecraftResourcesBuilder;
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
      minecraftDeployStrategy: asClass(MinecraftDeployStrategy),
      minecraftResourcesBuilder: asClass(MinecraftResourcesBuilder),
    });
  },
);

export { orchestrator };
export type { OrchestratorConfig, OrchestratorRegistry };
