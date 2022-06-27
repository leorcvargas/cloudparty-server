interface OrchestratorDeleteStrategy {
  delete(id: string, port: number): Promise<void>;
}

export { OrchestratorDeleteStrategy };
