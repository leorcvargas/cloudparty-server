import { DeleteGameServer } from '@/gameServer/application/useCases/deleteGameServer';
import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { OrchestratorDeleteContext } from '@/gameServer/interface/orchestrator/orchestratorDeleteContext';
import { OrchestratorDeleteStrategy } from '@/gameServer/interface/orchestrator/strategies/orchestratorDeleteStrategy';

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
    findById: jest.fn().mockReturnValue(
      Promise.resolve(
        new GameServer({
          id,
          type,
          name,
          port,
          hostname: 'localhost',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ),
    ),
  };
  const minecraftDeleteStrategy: OrchestratorDeleteStrategy = {
    delete: jest.fn(),
  };

  let deleteGameServer: DeleteGameServer;

  beforeEach(async () => {
    jest.clearAllMocks();
    deleteGameServer = new DeleteGameServer({
      gameServerRepository,
      minecraftDeleteStrategy,
      orchestratorDeleteContext: new OrchestratorDeleteContext(),
    });
  });

  it('should return the deleted id', async () => {
    const result = await deleteGameServer.execute({ id });

    expect(result).toBe(id);
  });

  it('should delete the game server', async () => {
    await deleteGameServer.execute({ id });

    expect(gameServerRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should delete server resources', async () => {
    await deleteGameServer.execute({ id });

    expect(minecraftDeleteStrategy.delete).toHaveBeenCalledWith(id, port);
  });
});
