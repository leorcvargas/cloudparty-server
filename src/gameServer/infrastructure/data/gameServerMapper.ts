import { GameServer } from '@/gameServer/domain/gameServer';
import { GameServerType } from '@/gameServer/domain/gameServerType';
import { DataMapper } from '@/lib/mapper';
import type { GameServerModelAttributes } from './gameServerModel';

const GameServerMapper: DataMapper<GameServer, GameServerModelAttributes> = {
  toData: (entity: GameServer) => ({
    id: entity.id,
    name: entity.name,
    hostname: entity.hostname,
    port: entity.port,
    type: entity.type,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    deletedAt: entity.deletedAt,
  }),
  toEntity: (data: GameServerModelAttributes) => {
    console.log(data);
    const gameServer = new GameServer({
      id: data.id,
      name: data.name,
      hostname: data.hostname,
      port: data.port,
      type: data.type as GameServerType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    });

    return gameServer;
  },
};

export { GameServerMapper };
