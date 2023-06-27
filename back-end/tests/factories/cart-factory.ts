import faker from '@faker-js/faker';
import { Cart, CartItem, Product } from '@prisma/client';
import { prisma } from '@/config';

export async function createCartItem(product?: Product, cart?: Cart): Promise<CartItem> {
  return prisma.cartItem.create({
    data: {
      cartId: cart?.id || null,
      productId: product.id,
      quantity: faker.datatype.number(),
    },
  });
}
