import Joi from 'joi';
import { CartItem } from '@prisma/client';

export const createCartItemSchema = Joi.object<CreateCartItemParams>({
  quantity: Joi.number().required(),
  productId: Joi.number().required(),
});

export type CreateCartItemParams = Omit<CartItem, 'createdAt' | 'updatedAt' | 'id' | 'cartId'>;
