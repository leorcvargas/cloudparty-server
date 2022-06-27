import { GameServer } from '@/gameServer/domain/gameServer';
import { UseCase } from '@/_lib/useCase';
import { GameServerRepository } from '@/gameServer/domain/gameServerRepository';

type Input = undefined;

type Output = GameServer[];

type Dependencies = {
  gameServerRepository: GameServerRepository;
};

class FindGameServers implements UseCase<Input, Output> {
  private readonly gameServerRepository: GameServerRepository;

  constructor(deps: Dependencies) {
    this.gameServerRepository = deps.gameServerRepository;
  }

  async execute(): Promise<Output> {
    return this.gameServerRepository.findAll();
  }
}

export { FindGameServers };
