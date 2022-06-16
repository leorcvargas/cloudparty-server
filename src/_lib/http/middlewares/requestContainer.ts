import { asValue } from 'awilix';
import { RequestHandler } from 'express';
import { Container } from '@/container';

const requestContainer =
  (container: Container): RequestHandler =>
  (req, res, next) => {
    const scopedContainer = container.createScope();

    scopedContainer.register({
      requestId: asValue(req.id as string),
    });

    req.container = scopedContainer;
    next();
  };

export { requestContainer };
