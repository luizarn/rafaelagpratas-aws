import { User } from '@prisma/client';
// eslint-disable-next-line import/default
import bcrypt from 'bcrypt';
import userRepository from '../../repositories/user-repository';
import { CreateUserParams } from '../../schemas';
import { duplicatedEmailError } from './errors';

export async function createUser({
  email,
  password,
  cpf,
  name,
  surname,
  isOwner,
  phone,
}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    cpf,
    name,
    surname,
    isOwner,
    phone,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const userService = {
  createUser,
};

export * from './errors';
export default userService;
