import * as k8s from '@kubernetes/client-node';

type Dependencies = {
  k8sAppsV1Api: k8s.AppsV1Api;
  k8sCoreV1Api: k8s.CoreV1Api;
};

class K8sClient {
  public readonly namespace = 'default';
  private readonly appsV1Api: k8s.AppsV1Api;
  private readonly coreV1Api: k8s.CoreV1Api;

  constructor(deps: Dependencies) {
    this.appsV1Api = deps.k8sAppsV1Api;
    this.coreV1Api = deps.k8sCoreV1Api;
  }

  public patchServiceDeletePort(name: string, portIndex: number) {
    const options = {
      headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH },
    };
    const patch = [
      {
        op: 'remove',
        path: `/spec/ports/${portIndex}`,
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

  public patchServiceAddPort(params: {
    name: string;
    port: number;
    targetPort: number;
    portName: string;
    protocol: 'TCP' | 'UDP';
  }) {
    const { name, port, portName, protocol, targetPort } = params;
    const options = {
      headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH },
    };
    const patch = [
      {
        op: 'add',
        path: '/spec/ports/-',
        value: { name: portName, port, targetPort, protocol },
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

  public patchConfigMapAddData(
    name: string,
    key: number | string,
    value: string,
  ) {
    const options = {
      headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_MERGE_PATCH },
    };
    const patch = {
      data: { [key]: value },
    };

    return this.coreV1Api.patchNamespacedConfigMap(
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

  public patchConfigMapDeleteData(name: string, key: number | string) {
    const options = {
      headers: { 'Content-type': k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH },
    };
    const patch = [
      {
        op: 'remove',
        path: `/data/${key}`,
      },
    ];

    return this.coreV1Api.patchNamespacedConfigMap(
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

  public createService(body: k8s.V1Service) {
    return this.coreV1Api.createNamespacedService(this.namespace, body);
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
