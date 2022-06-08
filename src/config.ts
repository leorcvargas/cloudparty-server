import {
  environment,
  EnvironmentConfig,
  envNumber,
  envString,
} from '@/lib/environment';
import { DatabaseConfig } from '@/boot/database';
import { ServerConfig } from './boot/server';
import { REPLConfig } from './boot/repl';

type Configuration = EnvironmentConfig &
  DatabaseConfig &
  ServerConfig &
  REPLConfig;

const config: Configuration = {
  appName: 'game-server-app',
  environment: environment(),
  cli: process.argv.includes('--cli'),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('DB_HOST', 'localhost'),
    port: envNumber('DB_PORT', 3000),
  },
  sequelize: {
    database: envString('DB_NAME', 'game_server_app'),
    host: envString('DB_HOST', 'localhost'),
    port: envNumber('DB_PORT', 5432),
    username: envString('DB_USER', 'game_server_app'),
    password: envString('DB_PASSWORD', 'game_server_app'),
  },
};

export { config };
export type { Configuration };
