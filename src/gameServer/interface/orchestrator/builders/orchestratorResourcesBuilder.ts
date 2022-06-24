import * as k8s from '@kubernetes/client-node';

interface OrchestratorResourcesBuilder {
  buildService(id: string, port: number, service: k8s.V1Service): k8s.V1Service;
  buildServiceName(id: string): string;
  buildDeployment(id: string): k8s.V1Deployment;
  buildDeploymentName(id: string): string;
}

export { OrchestratorResourcesBuilder };
