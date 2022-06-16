import { GameServerModel } from '../infrastructure/data/gameServerModel';
import { GameServer } from './gameServer';

interface GameServerRepository {
  getNextId(): string;
  save(entity: GameServer): Promise<GameServerModel>;
  findAll(): Promise<GameServer[]>;
  countByPort(port: number): Promise<number>;
}

export { GameServerRepository };
