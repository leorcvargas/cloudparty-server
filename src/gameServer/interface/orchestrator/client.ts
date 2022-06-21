import * as k8s from '@kubernetes/client-node';

type Dependencies = {
  k8sAppsV1Api: k8s.AppsV1Api;
  k8sCoreV1Api: k8s.CoreV1Api;
};

class K8sClient {
  private readonly namespace = 'default';
  private readonly appsV1Api: k8s.AppsV1Api;
  private readonly coreV1Api: k8s.CoreV1Api;

  constructor(deps: Dependencies) {
    this.appsV1Api = deps.k8sAppsV1Api;
    this.coreV1Api = deps.k8sCoreV1Api;
  }

  public createService(body: k8s.V1Service) {
    return this.coreV1Api.createNamespacedService(this.namespace, body);
  }

  public createDeployment(body: k8s.V1Deployment) {
    return this.appsV1Api.createNamespacedDeployment(this.namespace, body);
  }

  public deleteService(name: string) {
    return this.coreV1Api.deleteNamespacedService(name, this.namespace);
  }

  public deleteDeployment(name: string) {
    return this.appsV1Api.deleteNamespacedDeployment(name, this.namespace);
  }
}

export { K8sClient };
