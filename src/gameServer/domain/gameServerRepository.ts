import { GameServer } from './gameServer';

interface GameServerRepository {
  getNextId(): string;
  save(entity: GameServer): Promise<void>;
  findAll(): Promise<GameServer[]>;
  getAvailablePort(): Promise<number>;
}

export { GameServerRepository };
