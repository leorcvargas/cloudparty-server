import { GameServer } from './gameServer';

interface GameServerRepository {
  save(entity: GameServer): Promise<void>;
}

export { GameServerRepository };
