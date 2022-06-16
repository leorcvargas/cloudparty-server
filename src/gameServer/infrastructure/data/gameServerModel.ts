import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class GameServerModel extends Model<
  InferAttributes<GameServerModel>,
  InferCreationAttributes<GameServerModel>
> {
  id: string;
  name: string;
  hostname: string;
  port: number;
  type: 'MINECRAFT';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const initGameServerModel = (sequelize: Sequelize) => {
  return GameServerModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'deleted_at',
      },
    },
    { sequelize, modelName: 'GameServer', tableName: 'game_servers' },
  );
};

export { initGameServerModel, GameServerModel };
