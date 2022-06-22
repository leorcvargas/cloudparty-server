declare namespace Express {
  export interface Request {
    id: import('pino-http').ReqId;
    container: import('@/container').Container;
    accessToken: any;
  }
}
