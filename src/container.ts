import { createContainer } from 'awilix';
import { MainRegistry } from '@/boot';
import { DatabaseRegistry } from '@/boot/database';
import { AppModulesRegistry } from '@/boot/appModules';
import { ServerRegistry } from './boot/server';

type Registry = MainRegistry &
  DatabaseRegistry &
  AppModulesRegistry &
  ServerRegistry;

const container = createContainer<Registry>();

type Container = typeof container;

export { container };
export type { Container, Registry };
