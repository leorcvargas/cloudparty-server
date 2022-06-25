import * as k8s from '@kubernetes/client-node';

import { OrchestratorResourcesBuilder } from './orchestratorResourcesBuilder';

class MinecraftResourcesBuilder implements OrchestratorResourcesBuilder {
  public buildServiceName(id: string): string {
    return `mc-vanilla-svc-${id}`;
  }

  public buildService(id: string, port: number): k8s.V1Service {
    return {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: this.buildServiceName(id),
      },
      spec: {
        type: 'ClusterIP',
        ports: [{ port, targetPort: 25565, protocol: 'TCP' }],
        selector: { app: this.buildDeploymentName(id) },
      },
    };
  }

  public buildDeploymentName(id: string): string {
    return `mc-vanilla-deployment-${id}`;
  }

  public buildDeployment(id: string): k8s.V1Deployment {
    const deploymentName = this.buildDeploymentName(id);

    return {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: deploymentName,
        labels: {
          gameServerId: id,
          app: deploymentName,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: { gameServerId: id, app: deploymentName },
        },
        template: {
          metadata: { labels: { gameServerId: id, app: deploymentName } },
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
