import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import {
  createCategories,
  createProductWithEmphasisAndLaunch,
  createTags,
  createUserIsNotOwner,
  createUserIsOwner,
  createCartItem,
} from '../factories';
import { cleanDb, generateValidToken, generateValidTokenWhenAdmin } from '../helpers';
// eslint-disable-next-line import/no-unresolved
import app, { init } from '@/app';
// eslint-disable-next-line import/no-unresolved
import cartRepository from '@/repositories/cart-repository';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('post /cart', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/cart');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/cart').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/cart').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    // it('should respond with status 400 with a invalid body', async () => {
    //   const user = await createUserIsOwner();
    //   const token = await generateValidTokenWhenAdmin(user);
    //   const body = {
    //     quantity: faker.datatype.number(),
    //   };

    //   const response = await server.post('/cart').set('Authorization', `Bearer ${token}`).send(body);

    //   expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    // });

    it('should respond with status 404 if user has not cart', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);
      const body = {
        productId: product.id,
        quantity: faker.datatype.number(),
      };

      const response = await server.post('/cart').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    // it('should respond with status 201 with a valid body', async () => {
    //   const userbody = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(6),
    //   };
    //   const user = await createUserIsNotOwner(userbody);
    //   await server.post('/auth/sign-in').send(userbody);
    //   const token = await generateValidToken(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const body = {
    //     productId: product.id,
    //     quantity: faker.datatype.number(),
    //   };

    //   const response = await server.post('/cart').set('Authorization', `Bearer ${token}`).send(body);

    //   expect(response.status).toEqual(httpStatus.CREATED);
    // });
  });
});

describe('delete /cart/user/:cartItemId', () => {
  // it('should respond with status 401 if no token is given', async () => {
  //   const userbody = {
  //     email: faker.internet.email(),
  //     password: faker.internet.password(6),
  //   };
  //   const user = await createUserIsNotOwner(userbody);
  //   await server.post('/auth/sign-in').send(userbody);
  //   const token = await generateValidToken(user);
  //   const category = await createCategories();
  //   const tag = await createTags();
  //   const product = await createProductWithEmphasisAndLaunch(category, tag);
  //   const cart = await cartRepository.findByUserId(user.id);
  //   const cartItem = await createCartItem(product, cart);

  //   const response = await server.delete(`/cart/user/${cartItem.id}`);

  //   expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  // });

  // it('should respond with status 401 if given token is not valid', async () => {
  //   const userbody = {
  //     email: faker.internet.email(),
  //     password: faker.internet.password(6),
  //   };
  //   const user = await createUserIsNotOwner(userbody);
  //   await server.post('/auth/sign-in').send(userbody);
  //   const token = faker.lorem.word();
  //   const category = await createCategories();
  //   const tag = await createTags();
  //   const product = await createProductWithEmphasisAndLaunch(category, tag);
  //   const cart = await cartRepository.findByUserId(user.id);
  //   const cartItem = await createCartItem(product, cart);

  //   const response = await server.delete(`/cart/user/${cartItem.id}`).set('Authorization', `Bearer ${token}`);

  //   expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  // });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/cart/user/1`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    // it('should respond with status 404 for invalid id', async () => {
    //   const userbody = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(6),
    //   };
    //   const user = await createUserIsNotOwner(userbody);
    //   await server.post('/auth/sign-in').send(userbody);
    //   const token = await generateValidToken(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const cart = await cartRepository.findByUserId(user.id);
    //   const cartItem = await createCartItem(product, cart);
    //   const inexistentId = cartItem.id + 1;
    //   const response = await server.delete(`/cart/user/${inexistentId}`).set('Authorization', `Bearer ${token}`);
    //   expect(response.status).toEqual(httpStatus.NOT_FOUND);
    // });
    // it('should respond with status 200 with valid id and beeing an admin', async () => {
    //   const userbody = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(6),
    //   };
    //   const user = await createUserIsNotOwner(userbody);
    //   await server.post('/auth/sign-in').send(userbody);
    //   const token = await generateValidToken(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const cart = await cartRepository.findByUserId(user.id);
    //   const cartItem = await createCartItem(product, cart);
    //   const response = await server.delete(`/cart/user/${cartItem.id}`).set('Authorization', `Bearer ${token}`);
    //   expect(response.status).toEqual(httpStatus.OK);
    // });
  });
});

describe('get /cart/user', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/cart/user');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/cart/user').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/cart/user').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 if user has not cart', async () => {
      const user = await createUserIsNotOwner();
      const token = await generateValidToken(user);

      const response = await server.get('/cart/user').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    // it('should respond with status 200 with a valid body', async () => {
    //   const userbody = {
    //     email: faker.internet.email(),
    //     password: faker.internet.password(6),
    //   };
    //   const user = await createUserIsNotOwner(userbody);
    //   await server.post('/auth/sign-in').send(userbody);
    //   const token = await generateValidToken(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const body = {
    //     productId: product.id,
    //     quantity: faker.datatype.number(),
    //   };
    //   await server.post('/cart/user').set('Authorization', `Bearer ${token}`).send(body);

    //   const response = await server.get('/cart/user').set('Authorization', `Bearer ${token}`);

    //   expect(response.status).toEqual(httpStatus.OK);
    // });
  });
});
