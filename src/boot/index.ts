import { asValue } from 'awilix';
import { Logger } from 'pino';

import { appModules } from '@/boot/appModules';
import { database } from '@/boot/database';
import { withContext } from '@/context';
import { Configuration } from '@/config';
import { server } from './server';
import { repl } from './repl';
import { orchestrator } from './orchestrator';

const main = withContext(
  async ({ app, container, config, bootstrap, logger }) => {
    container.register({
      app: asValue(app),
      logger: asValue(logger),
      startedAt: asValue(new Date()),
      config: asValue(config),
    });

    app.onReady(async () => {
      // TODO: Only for development, remove it later
      const sequelize = container.resolve('sequelize');
      await sequelize.sync();
    }, 'append');

    await bootstrap(database, server, repl, orchestrator, ...appModules);
  },
);

type MainRegistry = {
  app: any;
  startedAt: Date;
  logger: Logger;
  config: Configuration;
};

export { main };
export type { MainRegistry };
