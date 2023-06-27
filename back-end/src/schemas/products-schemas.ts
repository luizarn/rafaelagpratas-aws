import Joi from 'joi';
import { Product } from '@prisma/client';

export const createProductSchema = Joi.object<CreateProductParams>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required(),
  tagId: Joi.number().required(),
  emphasis: Joi.boolean().required(),
  launch: Joi.boolean().required(),
});

export type CreateProductParams = Omit<Product, 'createdAt' | 'updatedAt' | 'id' | 'publicUrl' | 'size'>;
