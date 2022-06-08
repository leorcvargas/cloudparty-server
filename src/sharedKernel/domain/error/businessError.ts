import { BaseError, Exception } from '@/lib/errors/baseError';
import { makePredicate } from '@/lib/predicate';

namespace BusinessError {
  const type = Symbol();
  const code = 'BusinessError';

  type Props = {
    key: string;
    template: string | null;
    parameters?: any;
  };

  export const create = ({
    key,
    message,
    template,
    parameters,
  }: Props & { message: string }): Exception<Props> =>
    new BaseError<Props>({
      type,
      code,
      message,
      meta: { key, template, parameters },
    });

  export const is = makePredicate<Exception<Props>>(type);
}

export { BusinessError };
