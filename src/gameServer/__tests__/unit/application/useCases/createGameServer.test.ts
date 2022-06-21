import { Configuration } from '@/config';
import { CreateGameServer } from '@/gameServer/application/useCases/createGameServer';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { OrchestratorDeployContext } from '@/gameServer/interface/orchestrator/orchestratorDeployContext';
import { OrchestratorDeployStrategy } from '@/gameServer/interface/orchestrator/strategies/orchestratorDeployStrategy';

describe('CreateGameServer', () => {
  const id = 'mock-game-server-id';
  const name = 'mock-game-server-name';
  const type = GameServerType.Minecraft;
  const port = 30000;

  const gameServerRepository: GameServerRepository = {
    findAll: jest.fn(),
    save: jest.fn(),
    getAvailablePort: jest.fn().mockReturnValue(Promise.resolve(port)),
    getNextId: jest.fn().mockReturnValue(id),
    delete: jest.fn(),
    findById: jest.fn(),
  };
  const minecraftDeployStrategy: OrchestratorDeployStrategy = {
    deploy: jest.fn(),
  };

  let createGameServer: CreateGameServer;

  beforeEach(async () => {
    jest.clearAllMocks();
    createGameServer = new CreateGameServer({
      gameServerRepository,
      minecraftDeployStrategy,
      config: { http: { host: 'localhost' } } as Configuration,
      orchestratorDeployContext: new OrchestratorDeployContext(),
    });
  });

  it('should return the created id', async () => {
    const result = await createGameServer.execute({ name, type });

    expect(result).toBe(id);
  });

  it('should save the game server', async () => {
    await createGameServer.execute({ name, type });

    expect(gameServerRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id,
        name,
        type,
      }),
    );
  });

  it('should request to deploy the game server', async () => {
    await createGameServer.execute({ name, type });

    expect(minecraftDeployStrategy.deploy).toHaveBeenCalledWith(id, port);
  });
});
