import { appModules } from '@/boot/appModules';
import { asValue } from 'awilix';
import { database } from '@/boot/database';
import { withContext } from '@/context';
import { Configuration } from '@/config';
import { Logger } from 'pino';
import { server } from './server';
import { repl } from './repl';

const main = withContext(
  async ({ app, container, config, bootstrap, logger }) => {
    container.register({
      app: asValue(app),
      logger: asValue(logger),
      startedAt: asValue(new Date()),
      config: asValue(config),
    });

    await bootstrap(database, server, repl, ...appModules);
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
