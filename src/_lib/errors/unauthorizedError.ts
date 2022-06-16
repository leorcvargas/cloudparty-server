import { BaseError, Exception } from '@/_lib/errors/baseError';
import { makePredicate } from '@/_lib/predicate';

namespace UnauthorizedError {
  const type = Symbol();
  const code = 'UnauthorizedError';
  const message = 'Unauthorized';

  export const create = (customMsg?: string): Exception => new BaseError({ type, code, message: customMsg || message });

  export const is = makePredicate<Exception>(type);
}

export { UnauthorizedError };
