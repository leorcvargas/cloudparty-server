import { BaseError, Exception } from '@/_lib/errors/baseError';
import { makePredicate } from '@/_lib/predicate';

namespace NotFoundError {
  const type = Symbol();
  const code = 'NotFoundError';

  export const create = (message: string): Exception =>
    new BaseError({ type, code, message });

  export const is = makePredicate<Exception>(type);
}

export { NotFoundError };
