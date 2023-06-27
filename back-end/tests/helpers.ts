import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createSession, createSessionWhenAdmin } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.cartItem.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const userId = user.id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  await createSession(token, userId);
  return token;
}

export async function generateValidTokenWhenAdmin(user?: User) {
  const incomingUser = user;
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSessionWhenAdmin(token);

  return token;
}
