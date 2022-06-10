import { asValue } from 'awilix';
import { Sequelize } from 'sequelize';

import { makeModule } from '@/context';
import {
  makeSequelizeProvider,
  SequelizeProvider,
} from '@/lib/sequelizeProvider';

type DatabaseConfig = {
  sequelize: {
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
  };
};

type DatabaseRegistry = {
  sequelize: Sequelize;
  sequelizeProvider: SequelizeProvider;
};

const database = makeModule(
  'database',
  async ({
    container: { register },
    config: { sequelize: sequelizeConfig },
  }) => {
    const sequelize = new Sequelize({
      database: sequelizeConfig.database,
      host: sequelizeConfig.host,
      port: sequelizeConfig.port,
      username: sequelizeConfig.username,
      password: sequelizeConfig.password,
      dialect: 'postgres',
    });

    const sequelizeProvider = makeSequelizeProvider({ sequelize });

    register({
      sequelize: asValue(sequelize),
      sequelizeProvider: asValue(sequelizeProvider),
    });

    return async () => {
      await sequelize.close();
    };
  },
);

export { database };
export type { DatabaseRegistry, DatabaseConfig };
