import { User } from '@prisma/client';
// eslint-disable-next-line import/default
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/default
import jwt from 'jsonwebtoken';
import userRepository from '../..//repositories/user-repository';
import sessionRepository from '../..//repositories/session-repository';
import cartRepository from '../../repositories/cart-repository';
import { exclude } from '../../utils/prisma-utils';
import { invalidCredentialsError } from './errors';
// eslint-disable-next-line import/no-unresolved

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  await createCart(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
    name: true,
    isOwner: true,
    cpf: true,
    surname: true,
    phone: true,
  });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createCart(userId: number) {
  const existingCart = await cartRepository.findByUserId(userId);
  if (existingCart) {
    return existingCart;
  }

  return await cartRepository.create(userId);
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from './errors';
