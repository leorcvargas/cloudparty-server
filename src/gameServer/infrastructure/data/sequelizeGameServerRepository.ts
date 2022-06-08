import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '../../domain/gameServerRepository';
import { GameServerModel } from './gameServerModel';

type Dependencies = {
  gameServerModel: typeof GameServerModel;
};

class SequelizeGameServerRepository implements GameServerRepository {
  constructor(private readonly dependencies: Dependencies) {}

  async save(entity: GameServer): Promise<void> {
    const gameServer = this.dependencies.gameServerModel.build({ ...entity });
    await gameServer.save();
  }
}

export { SequelizeGameServerRepository };
