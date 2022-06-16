import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '../../domain/gameServerRepository';
import { GameServerModel } from './gameServerModel';

type Dependencies = {
  gameServerModel: typeof GameServerModel;
};

class SequelizeGameServerRepository implements GameServerRepository {
  constructor(private readonly deps: Dependencies) {}

  save(entity: GameServer): Promise<GameServerModel> {
    const gameServer = this.deps.gameServerModel.build({ ...entity });
    return gameServer.save();
  }

  countByPort(port: number): Promise<number> {
    return this.deps.gameServerModel.count({ where: { port } });
  }
}

export { SequelizeGameServerRepository };
