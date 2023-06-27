import faker from '@faker-js/faker';
import { Cart, Purchase, User } from '@prisma/client';
import { prisma } from '@/config';

export async function createPurchase(user?: User, cart?: Cart): Promise<Purchase> {
  return prisma.purchase.create({
    data: {
      cartId: cart?.id || null,
      total: 100,
      userId: user.id,
    },
  });
}
