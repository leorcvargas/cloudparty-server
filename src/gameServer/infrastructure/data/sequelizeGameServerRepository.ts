import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerRepository } from '../../domain/gameServerRepository';
import { GameServerMapper } from './gameServerMapper';
import { GameServerModel } from './gameServerModel';
import { v4 } from 'uuid';

type Dependencies = {
  gameServerModel: typeof GameServerModel;
};

class SequelizeGameServerRepository implements GameServerRepository {
  private readonly gameServerModel: typeof GameServerModel;

  constructor(deps: Dependencies) {
    this.gameServerModel = deps.gameServerModel;
  }

  getNextId(): string {
    return v4();
  }

  async save(entity: GameServer): Promise<void> {
    const data = GameServerMapper.toData(entity);
    const gameServer = this.gameServerModel.build(data);

    await gameServer.save();
  }

  async findAll(): Promise<GameServer[]> {
    const gameServers = await this.gameServerModel.findAll();
    return gameServers.map(GameServerMapper.toEntity);
  }

  async getAvailablePort(): Promise<number> {
    const port = Math.floor(Math.random() * 2768) + 30000;

    const countSamePort = await this.gameServerModel.count({ where: { port } });
    const isPortAvailable = countSamePort === 0;

    if (isPortAvailable) {
      return port;
    }

    return this.getAvailablePort();
  }
}

export { SequelizeGameServerRepository };
