interface OrchestratorDeployStrategy {
  deploy(id: string, port: number): Promise<void>;
}

export { OrchestratorDeployStrategy };
