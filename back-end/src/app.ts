import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from './config';

loadEnv();

import { handleApplicationErrors } from './middlewares/error-handling-middleware';
import { usersRouter, authenticationRouter, productsRouter, cartRouter, purchaseRouter } from './routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/products', productsRouter)
  .use('/cart', cartRouter)
  .use('/purchase', purchaseRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
