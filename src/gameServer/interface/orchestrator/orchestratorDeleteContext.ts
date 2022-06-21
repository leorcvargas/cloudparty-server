import { OrchestratorDeleteStrategy } from './strategies/orchestratorDeleteStrategy';

export class OrchestratorDeleteContext {
  private strategy: OrchestratorDeleteStrategy | undefined;

  public setStrategy(strategy: OrchestratorDeleteStrategy): void {
    this.strategy = strategy;
  }

  public execute(id: string) {
    if (!this.strategy) {
      throw new Error('OrchestratorDeleteStrategy not defined');
    }

    return this.strategy.delete(id);
  }
}
