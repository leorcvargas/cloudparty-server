import { GameServer } from './gameServer';

interface GameServerRepository {
  getNextId(): string;
  save(entity: GameServer): Promise<void>;
  findAll(): Promise<GameServer[]>;
  countByPort(port: number): Promise<number>;
}

export { GameServerRepository };
