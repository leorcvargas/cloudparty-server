import { BaseError, Exception } from '@/lib/errors/baseError';
import { makePredicate } from '@/lib/predicate';

namespace NotFoundError {
  const type = Symbol();
  const code = 'NotFoundError';

  export const create = (message: string): Exception =>
    new BaseError({ type, code, message });

  export const is = makePredicate<Exception>(type);
}

export { NotFoundError };
