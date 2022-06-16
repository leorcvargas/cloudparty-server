import { createContainer } from 'awilix';
import { MainRegistry } from '@/_boot';
import { DatabaseRegistry } from '@/_boot/database';
import { AppModulesRegistry } from '@/_boot/appModules';
import { ServerRegistry } from './_boot/server';
import { OrchestratorRegistry } from './_boot/orchestrator';

type Registry = MainRegistry &
  DatabaseRegistry &
  AppModulesRegistry &
  OrchestratorRegistry &
  ServerRegistry;

const container = createContainer<Registry>();

type Container = typeof container;

export { container };
export type { Container, Registry };
