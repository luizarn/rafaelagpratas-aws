import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { generateCPF } from '@brazilian-utils/brazilian-utils';
import { prisma } from '@/config';

export async function createUserIsNotOwner(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  const userData = {
    email: params.email || faker.internet.email(),
    password: hashedPassword,
    name: params.name || faker.name.findName(),
    surname: params.surname || faker.name.lastName(),
    cpf: params.cpf || generateCPF(),
    isOwner: params.isOwner !== undefined ? params.isOwner : false,
    phone: '61 98500-0000',
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
}

export async function createUserIsOwner(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      name: faker.name.findName(),
      surname: faker.name.lastName(),
      cpf: generateCPF(),
      isOwner: true,
      phone: faker.phone.phoneNumber('(##) 9####-####'),
    },
  });
}
