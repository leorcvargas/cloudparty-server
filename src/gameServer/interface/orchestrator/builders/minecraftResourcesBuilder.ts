import { V1Service, V1Deployment } from '@kubernetes/client-node';

import { OrchestratorResourcesBuilder } from './orchestratorResourcesBuilder';

class MinecraftResourcesBuilder implements OrchestratorResourcesBuilder {
  public buildServiceName(id: string): string {
    return `mc-svc-${id}`;
  }

  public buildService(id: string, port: number, service: V1Service): V1Service {
    const newPort = { port, targetPort: 25565, protocol: 'TCP', name: id };

    const changedService: V1Service = {
      ...service,
      spec: {
        ...service.spec,
        ports: [...(service.spec?.ports ?? []), newPort],
      },
    };

    return changedService;
    // return {
    //   apiVersion: 'v1',
    //   kind: 'Service',
    //   metadata: {
    //     name: this.buildServiceName(id),
    //     labels: {
    //       'app.kubernetes.io/name': 'mc-vanilla-svc',
    //     },
    //   },
    //   spec: {
    //     type: 'LoadBalancer',
    //     ports: [{ port, targetPort: 25565, protocol: 'TCP' }],
    //     selector: { app: `mc-vanilla-${id}` },
    //   },
    // };
  }

  public buildDeploymentName(id: string): string {
    return `mc-deployment-${id}`;
  }

  public buildDeployment(id: string): V1Deployment {
    return {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: this.buildDeploymentName(id),
        labels: {
          gameServerId: id,
          app: 'mc-vanilla-server',
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: { gameServerId: id, app: 'mc-vanilla-server' },
        },
        template: {
          metadata: { labels: { gameServerId: id, app: 'mc-vanilla-server' } },
          spec: {
            containers: [
              {
                image: 'itzg/minecraft-server',
                name: `mc-vanilla-id`,
                env: [{ name: 'EULA', value: 'true' }],
                ports: [
                  { containerPort: 25565, name: 'main', protocol: 'TCP' },
                ],
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
    };
  }
}

export { MinecraftResourcesBuilder };
