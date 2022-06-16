interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export { UseCase };
