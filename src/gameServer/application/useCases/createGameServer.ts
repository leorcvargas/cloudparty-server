import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { UseCase } from '@/lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';

interface Input {
  name: string;
  type: GameServerType;
}

type Output = GameServer;

type Dependencies = {
  gameServerRepository: GameServerRepository;
};

class CreateGameServer implements UseCase<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  public async execute(input: Input): Promise<Output> {
    const gameServer = new GameServer({
      ...input,
      hostname: 'localhost',
      port: 8080,
    });

    // TODO: Create in K8s

    await this.dependencies.gameServerRepository.save(gameServer);

    return gameServer;
  }
}

export { CreateGameServer };
