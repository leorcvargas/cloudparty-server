import {
  environment,
  EnvironmentConfig,
  envNumber,
  envString,
} from '@/lib/environment';
import { DatabaseConfig } from '@/boot/database';
import { ServerConfig } from './boot/server';
import { REPLConfig } from './boot/repl';
import { K8sConfig } from './boot/k8s';

type Configuration = EnvironmentConfig &
  DatabaseConfig &
  ServerConfig &
  K8sConfig &
  REPLConfig;

const config: Configuration = {
  appName: 'game-server-app',
  environment: environment(),
  cli: process.argv.includes('--cli'),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', '127.0.0.1'),
    port: envNumber('PORT', 3000),
  },
  sequelize: {
    database: envString('DB_NAME', 'game_server_app'),
    host: envString('DB_HOST', '127.0.0.1'),
    port: envNumber('DB_PORT', 5432),
    username: envString('DB_USER', 'game_server_app'),
    password: envString('DB_PASSWORD', 'game_server_app'),
  },
};

export { config };
export type { Configuration };
