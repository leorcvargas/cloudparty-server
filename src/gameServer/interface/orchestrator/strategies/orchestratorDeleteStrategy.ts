interface OrchestratorDeleteStrategy {
  delete(id: string): Promise<void>;
}

export { OrchestratorDeleteStrategy };
