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

  const gameServerRepository: GameServerRepository = {
    findAll: jest.fn(),
    save: jest.fn(),
    countByPort: jest.fn().mockReturnValue(Promise.resolve(0)),
    getNextId: jest.fn().mockReturnValue(id),
  };
  const minecraftDeployStrategy: OrchestratorDeployStrategy = {
    deploy: jest.fn(),
  };
  const orchestratorDeployContext = {
    setStrategy: jest.fn(),
    execute: jest.fn(),
  } as any as OrchestratorDeployContext;

  let createGameServer: CreateGameServer;

  beforeEach(async () => {
    jest.clearAllMocks();
    createGameServer = new CreateGameServer({
      config: { http: { host: 'localhost' } } as Configuration,
      gameServerRepository,
      minecraftDeployStrategy,
      orchestratorDeployContext,
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
});
