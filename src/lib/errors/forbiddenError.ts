import { BaseError, Exception } from '@/lib/errors/baseError';
import { makePredicate } from '@/lib/predicate';

namespace ForbiddenError {
  const type = Symbol();
  const code = 'ForbiddenError';
  const message = 'Forbidden';

  export const create = (customMsg?: string): Exception =>
    new BaseError({ type, code, message: customMsg || message });

  export const is = makePredicate<Exception>(type);
}

export { ForbiddenError };
