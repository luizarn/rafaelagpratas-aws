import { Router } from 'express';
import { createOrUpdateCartItem, deleteCartItem, getCartItems } from '../controllers/cart-controller';
import { validateBody } from '../middlewares/validation-middleware';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { createCartItemSchema } from '../schemas/cartItem-schemas';

const cartRouter = Router();

cartRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createCartItemSchema), createOrUpdateCartItem)
  .get('/user', getCartItems)
  .delete('/user/:id', deleteCartItem);

export { cartRouter };
