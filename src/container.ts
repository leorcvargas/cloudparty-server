import { createContainer } from 'awilix';
import { MainRegistry } from '@/boot';
import { DatabaseRegistry } from '@/boot/database';
import { AppModulesRegistry } from '@/boot/appModules';
import { ServerRegistry } from './boot/server';
import { OrchestratorRegistry } from './boot/orchestrator';

type Registry = MainRegistry &
  DatabaseRegistry &
  AppModulesRegistry &
  OrchestratorRegistry &
  ServerRegistry;

const container = createContainer<Registry>();

type Container = typeof container;

export { container };
export type { Container, Registry };
