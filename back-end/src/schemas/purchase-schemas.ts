import Joi from 'joi';
import { Purchase } from '@prisma/client';

export const createPurchaseSchema = Joi.object<CreatePurchaseParams>({
  cartId: Joi.number().required(),
  total: Joi.number().required(),
});

export type CreatePurchaseParams = Omit<Purchase, 'createdAt' | 'updatedAt' | 'id' | 'date'>;
