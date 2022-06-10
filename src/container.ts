import { createContainer } from 'awilix';
import { MainRegistry } from '@/boot';
import { DatabaseRegistry } from '@/boot/database';
import { AppModulesRegistry } from '@/boot/appModules';
import { ServerRegistry } from './boot/server';
import { K8sRegistry } from './boot/k8s';

type Registry = MainRegistry &
  DatabaseRegistry &
  AppModulesRegistry &
  K8sRegistry &
  ServerRegistry;

const container = createContainer<Registry>();

type Container = typeof container;

export { container };
export type { Container, Registry };
