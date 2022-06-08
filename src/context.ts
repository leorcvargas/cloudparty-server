import { makeContext } from '@/lib/context';
import { container } from '@/container';
import { config } from '@/config';
import { logger } from '@/lib/logger';

const { withContext, makeModule } = makeContext(
  { config, container, logger },
  { logger },
);

export { withContext, makeModule };
