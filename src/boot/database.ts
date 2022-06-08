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

const database = makeModule(
  'database',
  async ({ container: { register }, config: { sequelize } }) => {
    const client = new Sequelize({
      database: sequelize.database,
      host: sequelize.host,
      port: sequelize.port,
      username: sequelize.username,
      password: sequelize.password,
      dialect: 'postgres',
      sync: { force: true },
    });

    // TODO: Use migrations
    client.afterDefine('sync', () => {
      return client.sync({ force: true }).catch((err) => console.error(err));
    });

    const sequelizeProvider = makeSequelizeProvider({ sequelize: client });

    register({
      sequelize: asValue(client),
      sequelizeProvider: asValue(sequelizeProvider),
    });

    return async () => {
      await client.close();
    };
  },
);

type DatabaseRegistry = {
  sequelize: Sequelize;
  sequelizeProvider: SequelizeProvider;
};

export { database };
export type { DatabaseRegistry, DatabaseConfig };
