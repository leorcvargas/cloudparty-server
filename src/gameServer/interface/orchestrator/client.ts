import * as k8s from '@kubernetes/client-node';

type Dependencies = {
  k8sAppsV1Api: k8s.AppsV1Api;
  k8sCoreV1Api: k8s.CoreV1Api;
};

type CreateDeploymentProps = {
  id: string;
};

type CreateServiceProps = {
  id: string;
};

class K8sClient {
  private readonly namespace = 'default';
  private readonly appsV1Api: k8s.AppsV1Api;
  private readonly coreV1Api: k8s.CoreV1Api;

  constructor(deps: Dependencies) {
    this.appsV1Api = deps.k8sAppsV1Api;
    this.coreV1Api = deps.k8sCoreV1Api;
  }

  public createService({ id }: CreateServiceProps) {
    return this.coreV1Api.createNamespacedService(this.namespace, {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: `mc-svc-${id}`,
        labels: {
          gameServerId: id,
        },
      },
      spec: {
        type: 'NodePort',
        ports: [{ port: 25565, nodePort: 30000 }],
        selector: { app: `mc-vanilla-${id}` },
      },
    });
  }

  public createDeployment({ id }: CreateDeploymentProps) {
    return this.appsV1Api.createNamespacedDeployment(this.namespace, {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: `mc-vanilla-${id}`,
        labels: {
          gameServerId: id,
        },
      },
      spec: {
        selector: {
          matchLabels: { app: `mc-vanilla-${id}` },
        },
        template: {
          metadata: { labels: { app: `mc-vanilla-${id}` } },
          spec: {
            containers: [
              {
                image: 'itzg/minecraft-server',
                name: `mc-vanilla-id`,
                env: [{ name: 'EULA', value: 'true' }],
                ports: [{ containerPort: 25565, name: 'main' }],
                readinessProbe: {
                  exec: { command: ['mcstatus', 'localhost', 'ping'] },
                  initialDelaySeconds: 90,
                  periodSeconds: 90,
                },
                livenessProbe: {
                  exec: { command: ['mcstatus', 'localhost', 'ping'] },
                  initialDelaySeconds: 90,
                  periodSeconds: 90,
                },
                resources: {
                  requests: { cpu: '50m', memory: '100Mi' },
                  limits: { cpu: '1', memory: '2Gi' },
                },
                volumeMounts: [{ name: 'mc-data', mountPath: '/data' }],
              },
            ],
            volumes: [{ name: 'mc-data', emptyDir: {} }],
          },
        },
      },
    });
  }
}

export { K8sClient };
