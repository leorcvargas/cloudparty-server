interface ServerGatewayStrategy {
  execute(payload): Promise<void>;
}