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

  public patchServicePorts(name: string, body: k8s.V1Service) {
    const options = {
      headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH },
    };
    const patch = [
      {
        op: 'replace',
        path: '/spec/ports',
        value: body.spec?.ports,
      },
    ];

    return this.coreV1Api.patchNamespacedService(
      name,
      this.namespace,
      patch,
      undefined,
      undefined,
      undefined,
      undefined,
      options,
    );
  }

  public createDeployment(body: k8s.V1Deployment) {
    return this.appsV1Api.createNamespacedDeployment(this.namespace, body);
  }

  public getService(name: string) {
    return this.coreV1Api.readNamespacedService(name, this.namespace);
  }

  public deleteService(name: string) {
    return this.coreV1Api.deleteNamespacedService(name, this.namespace);
  }

  public deleteDeployment(name: string) {
    return this.appsV1Api.deleteNamespacedDeployment(name, this.namespace);
  }
}

export { K8sClient };
