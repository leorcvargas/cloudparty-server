import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '../../domain/gameServerRepository';
import { GameServerMapper } from './gameServerMapper';
import { GameServerModel } from './gameServerModel';

type Dependencies = {
  gameServerModel: typeof GameServerModel;
};

class SequelizeGameServerRepository implements GameServerRepository {
  private readonly gameServerModel: typeof GameServerModel;

  constructor(deps: Dependencies) {
    this.gameServerModel = deps.gameServerModel;
  }

  save(entity: GameServer): Promise<GameServerModel> {
    const gameServer = this.gameServerModel.build({ ...entity });
    return gameServer.save();
  }

  countByPort(port: number): Promise<number> {
    return this.gameServerModel.count({ where: { port } });
  }

  async findAll(): Promise<GameServer[]> {
    const gameServers = await this.gameServerModel.findAll();
    return gameServers.map(GameServerMapper.toEntity);
  }
}

export { SequelizeGameServerRepository };
