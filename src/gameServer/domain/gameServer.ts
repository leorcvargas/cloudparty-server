import { v4 as uuidv4 } from 'uuid';

import { GameServerType } from './gameServerType';

type GameServerProps = {
  id?: string;
  name: string;
  hostname: string;
  port: number;
  type: GameServerType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

class GameServer {
  public id: string;
  public name: string;
  public hostname: string;
  public port: number;
  public type: GameServerType;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;

  constructor(props: GameServerProps) {
    this.id = props.id ?? uuidv4();
    this.name = props.name;
    this.hostname = props.hostname;
    this.port = props.port;
    this.type = props.type;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  public get address(): string {
    return `${this.hostname}:${this.port}`;
  }

  public get isDeleted(): boolean {
    return !this.deletedAt;
  }

  public markAsDeleted(): void {
    this.deletedAt = new Date();
  }
}

export { GameServer };
