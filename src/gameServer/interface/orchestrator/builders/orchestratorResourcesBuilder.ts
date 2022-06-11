import * as k8s from '@kubernetes/client-node';

interface OrchestratorResourcesBuilder {
  buildService(id: string, port: number): k8s.V1Service;
  buildDeployment(id: string): k8s.V1Deployment;
}

export { OrchestratorResourcesBuilder };
