import { GameServer } from './gameServer';

interface GameServerRepository {
  getNextId(): string;
  save(entity: GameServer): Promise<void>;
  findAll(): Promise<GameServer[]>;
  findById(id: string): Promise<GameServer | null>;
  delete(id: string): Promise<void>;
  getAvailablePort(): Promise<number>;
}

export { GameServerRepository };
