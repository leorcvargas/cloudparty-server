import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '../../domain/gameServerRepository';
import { GameServerModel } from './gameServerModel';

type Dependencies = {
  gameServerModel: typeof GameServerModel;
};

class SequelizeGameServerRepository implements GameServerRepository {
  constructor(private readonly dependencies: Dependencies) {}

  save(entity: GameServer): Promise<GameServerModel> {
    const gameServer = this.dependencies.gameServerModel.build({ ...entity });
    return gameServer.save();
  }
}

export { SequelizeGameServerRepository };
