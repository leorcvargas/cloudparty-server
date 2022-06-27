import { OrchestratorDeployStrategy } from './strategies/orchestratorDeployStrategy';

export class OrchestratorDeployContext {
  private strategy: OrchestratorDeployStrategy | undefined;

  public setStrategy(strategy: OrchestratorDeployStrategy): void {
    this.strategy = strategy;
  }

  public execute(id: string, port: number) {
    if (!this.strategy) {
      throw new Error('OrchestratorDeployStrategy not defined');
    }

    return this.strategy.deploy(id, port);
  }
}
