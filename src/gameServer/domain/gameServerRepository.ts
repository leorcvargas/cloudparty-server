import { GameServerModel } from '../infrastructure/data/gameServerModel';
import { GameServer } from './gameServer';

interface GameServerRepository {
  save(entity: GameServer): Promise<GameServerModel>;
}

export { GameServerRepository };
