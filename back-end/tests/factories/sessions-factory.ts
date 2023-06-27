import { Session } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { createUserIsNotOwner, createUserIsOwner } from './users-factory';
import { prisma } from '@/config';

export async function createSession(token: string, userId: number): Promise<Session> {
  return prisma.session.create({
    data: {
      token: token,
      userId: userId,
    },
  });
}

export async function createSessionWhenAdmin(token: string): Promise<Session> {
  const user = await createUserIsOwner();

  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
