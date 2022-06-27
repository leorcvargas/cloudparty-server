interface OrchestratorGateway {
  findGameServerStatus(gameServerId: string): Promise<'ONLINE' | 'BOOTING' | 'OFFLINE'>;
}

export { OrchestratorGateway };
