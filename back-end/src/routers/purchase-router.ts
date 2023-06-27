import { Router } from 'express';
import { createPurchase, listPurchaseById } from '../controllers/purchase-controller';
import { createPurchaseSchema } from '../schemas/purchase-schemas';
import { validateBody } from '../middlewares/validation-middleware';
import { authenticateToken } from '../middlewares/authentication-middleware';

const purchaseRouter = Router();

purchaseRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createPurchaseSchema), createPurchase)
  .get('/:id', listPurchaseById);

export { purchaseRouter };
