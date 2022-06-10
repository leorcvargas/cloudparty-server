import * as k8sClientNode from '@kubernetes/client-node';

import { makeModule } from '@/context';
import { asClass, asValue } from 'awilix';
import { K8sClient } from '@/gameServer/interface/k8s/client';

type K8sConfig = any;

type K8sRegistry = {
  k8sAppsV1Api: k8sClientNode.AppsV1Api;
  k8sCoreV1Api: k8sClientNode.CoreV1Api;
  k8sClient: K8sClient;
};

const k8s = makeModule('k8s', async ({ container: { register } }) => {
  const kc = new k8sClientNode.KubeConfig();
  kc.loadFromDefault();
  const k8sAppsV1Api = kc.makeApiClient(k8sClientNode.AppsV1Api);
  const k8sCoreV1Api = kc.makeApiClient(k8sClientNode.CoreV1Api);

  register({
    k8sAppsV1Api: asValue(k8sAppsV1Api),
    k8sCoreV1Api: asValue(k8sCoreV1Api),
    k8sClient: asClass(K8sClient),
  });
});

export { k8s };
export type { K8sConfig, K8sRegistry };
