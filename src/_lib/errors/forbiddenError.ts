import { BaseError, Exception } from '@/_lib/errors/baseError';
import { makePredicate } from '@/_lib/predicate';

namespace ForbiddenError {
  const type = Symbol();
  const code = 'ForbiddenError';
  const message = 'Forbidden';

  export const create = (customMsg?: string): Exception =>
    new BaseError({ type, code, message: customMsg || message });

  export const is = makePredicate<Exception>(type);
}

export { ForbiddenError };
