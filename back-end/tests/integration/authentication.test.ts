/* eslint-disable import/no-unresolved */
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUserIsNotOwner } from '../factories';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';
import cartRepository from '@/repositories/cart-repository';
import { prisma } from '@/config';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /auth/sign-in', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-in');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-in').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it('should respond with status 401 if there is no user for given email', async () => {
      const body = generateValidBody();

      const response = await server.post('/auth/sign-in').send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
      const body = generateValidBody();
      await createUserIsNotOwner(body);

      const response = await server.post('/auth/sign-in').send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when credentials are valid', () => {
      // it('should respond with status 200', async () => {
      //   const body = generateValidBody();
      //   await createUserIsNotOwner(body);

      //   const response = await server.post('/auth/sign-in').send(body);

      //   expect(response.status).toBe(httpStatus.OK);
      // });

      it('should respond with user data', async () => {
        const body = generateValidBody();
        const user = await createUserIsNotOwner(body);

        const response = await server.post('/auth/sign-in').send(body);

        expect(response.body.user).toEqual({
          id: user.id,
          email: user.email,
          cpf: user.cpf,
          isOwner: user.isOwner,
          phone: user.phone,
          name: user.name,
          surname: user.surname,
        });
      });

      // it('should respond with session token', async () => {
      //   const body = generateValidBody();
      //   await createUserIsNotOwner(body);

      //   const response = await server.post('/auth/sign-in').send(body);

      //   expect(response.body.token).toBeDefined();
      // });

      it('should create a cart', async () => {
        const body = generateValidBody();
        await createUserIsNotOwner(body);

        const response = await server.post('/auth/sign-in').send(body);

        expect(response.body.token).toBeDefined();

        const user = await prisma.session.findFirst({
          where: {
            token: response.body.token,
          },
        });
        const cart = await cartRepository.findByUserId(user.userId);

        expect(cart).toBeDefined();
        expect(cart.userId).toBe(user.userId);
      });
    });
  });
});
