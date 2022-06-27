interface OrchestratorInterface {
  getGameServerStatus(gameServerId: string): Promise<'ONLINE' | 'BOOTING' | 'OFFLINE'>;
}

export { OrchestratorInterface };
