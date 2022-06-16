import { Container, container } from '@/container';
import { withContext } from '@/context';
import { main } from '@/_boot';
import { Sequelize } from 'sequelize';
import supertest, { SuperTest, Test } from 'supertest';

type Dependencies = {
  sequelize: Sequelize;
};

type TestControls = Readonly<{
  request: () => SuperTest<Test>;
  clearDatabase: () => Promise<void>;
  cleanUp: () => Promise<void>;
  container: Container;
  registry: Container['cradle'];
}>;

const appRunning = withContext(
  ({ app: { onRunning } }) =>
    new Promise<void>((resolve) => {
      onRunning(async () => {
        resolve();
      });

      main();
    }),
);

const makeClearDatabase =
  ({ sequelize }: Dependencies) =>
  async (): Promise<void> => {
    const modelsDict = sequelize.models;
    const models = Object.values(modelsDict);
    await Promise.all(
      models.map((model) => model.destroy({ where: {}, truncate: true })),
    );
  };

const makeTestControls = async (): Promise<TestControls> => {
  await appRunning();

  const { server } = container.cradle;

  const clearDatabase = container.build(makeClearDatabase);

  const cleanUp = withContext(async ({ app }) => {
    await clearDatabase();
    await app.stop();
  });

  return {
    request: () => supertest(server),
    registry: container.cradle,
    clearDatabase,
    container,
    cleanUp,
  };
};

export { makeTestControls };
export type { TestControls };
