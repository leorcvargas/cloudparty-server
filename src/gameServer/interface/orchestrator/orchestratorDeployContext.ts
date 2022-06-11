import { OrchestratorDeployStrategy } from './strategies/orchestratorDeployStrategy';

export class OrchestratorDeployContext {
  private strategy: OrchestratorDeployStrategy;

  public setStrategy(strategy: OrchestratorDeployStrategy): void {
    this.strategy = strategy;
  }

  public execute(id: string, port: number) {
    return this.strategy.deploy(id, port);
  }
}
