import { gameServerModule, GameServerRegistry } from '@/gameServer';

// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [gameServerModule];

type AppModulesRegistry = GameServerRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
