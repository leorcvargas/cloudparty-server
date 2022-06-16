import { V1Service, V1Deployment } from '@kubernetes/client-node';

import { OrchestratorResourcesBuilder } from './orchestratorResourcesBuilder';

class MinecraftResourcesBuilder implements OrchestratorResourcesBuilder {
  public buildService(id: string, port: number): V1Service {
    return {
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
        ports: [{ port: 25565, nodePort: port }],
        selector: { app: `mc-vanilla-${id}` },
      },
    };
  }

  public buildDeployment(id: string): V1Deployment {
    return {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: `mc-vanilla-${id}`,
        labels: {
          gameServerId: id,
        },
      },
      spec: {
        replicas: 1,
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
    };
  }
}

export { MinecraftResourcesBuilder };
