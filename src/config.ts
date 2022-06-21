import {
  environment,
  EnvironmentConfig,
  envNumber,
  envString,
} from '@/_lib/environment';
import { DatabaseConfig } from '@/_boot/database';
import { ServerConfig } from './_boot/server';
import { REPLConfig } from './_boot/repl';
import { OrchestratorConfig } from './_boot/orchestrator';

type Configuration = EnvironmentConfig &
  DatabaseConfig &
  ServerConfig &
  OrchestratorConfig &
  REPLConfig;

const config: Configuration = {
  appName: 'cloudparty-server',
  environment: environment(),
  cli: process.argv.includes('--cli'),
  orchestrator: {
    kubeConfig: envString('KUBECONFIG', '~/.kube/config-local')
  },
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', '127.0.0.1'),
    port: envNumber('PORT', 3001),
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
