import { Sequelize, Model } from 'sequelize';

interface Dependencies {
  sequelize: Sequelize;
}

type ModelInitializer = Record<
  string,
  (sequelize: Sequelize) => ReturnType<typeof Model['init']>
>;

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type SequelizeProvider = <Type extends ModelInitializer>(
  modelInitializer: Type,
) => Promise<{ [key in keyof Type]: ThenArg<ReturnType<Type[key]>> }>;

type InitializedModels<Type extends ModelInitializer> = Promise<{
  [key in keyof Type]: ThenArg<ReturnType<Type[key]>>;
}>;

const makeSequelizeProvider =
  ({ sequelize }: Dependencies): SequelizeProvider =>
  (models) =>
    Object.entries(models).reduce(
      (chain: Promise<any>, [key, promise]) =>
        chain.then((acc) =>
          Promise.resolve(promise(sequelize)).then((model) => ({
            ...acc,
            [key]: model,
          })),
        ),
      Promise.resolve(),
    );

const withSequelizeProvider =
  <Type extends ModelInitializer>(models: Type) =>
  ({
    sequelizeProvider,
  }: {
    sequelizeProvider: SequelizeProvider;
  }): InitializedModels<Type> =>
    sequelizeProvider(models);

export { makeSequelizeProvider, withSequelizeProvider };
export type { SequelizeProvider };
