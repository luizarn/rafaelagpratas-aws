import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import { createUserIsNotOwner } from '../factories';
import { cleanDb } from '../helpers';
// eslint-disable-next-line import/no-unresolved
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('post /purchase', () => {
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
});
// describe('when token is valid', () => {
// it('should respond with status 400 with a invalid body', async () => {
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
//   const body = {
//     cartId: cart.id,
//     total: 'test',
//   };

//   const response = await server.post('/purchase').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.BAD_REQUEST);
// });

// it('should respond with status 400 if cartId invalid', async () => {
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
//   await createCartItem(product, cart);
//   const body = {
//     cartId: cart.id + 1,
//     total: 'test',
//   };

//   const response = await server.post('/purchase').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.BAD_REQUEST);
// });

//     it('should respond with status 201 with a valid body', async () => {
//       const userbody = {
//         email: faker.internet.email(),
//         password: faker.internet.password(6),
//       };
//       const user = await createUserIsNotOwner(userbody);
//       await server.post('/auth/sign-in').send(userbody);
//       const token = await generateValidToken(user);
//       const category = await createCategories();
//       const tag = await createTags();
//       const product = await createProductWithEmphasisAndLaunch(category, tag);
//       const cart = await cartRepository.findByUserId(user.id);
//       await createCartItem(product, cart);
//       const body = {
//         cartId: cart.id,
//         total: 100,
//       };

//       const response = await server.post('/purchase').set('Authorization', `Bearer ${token}`).send(body);

//       expect(response.status).toEqual(httpStatus.CREATED);
//     });
//   });
// });

describe('get /purchase/:id', () => {
  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/purchase/1`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
//   it('should respond with status 401 if no token is given', async () => {
//     const userbody = {
//       email: faker.internet.email(),
//       password: faker.internet.password(6),
//     };
//     const user = await createUserIsNotOwner(userbody);
//     await server.post('/auth/sign-in').send(userbody);
//     const token = await generateValidToken(user);
//     const category = await createCategories();
//     const tag = await createTags();
//     const product = await createProductWithEmphasisAndLaunch(category, tag);
//     const cart = await cartRepository.findByUserId(user.id);
//     await createCartItem(product, cart);
//     const purchase = await createPurchase(user, cart);

//     const response = await server.get(`/purchase/${purchase.id}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

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
//   await createCartItem(product, cart);
//   const purchase = await createPurchase(user, cart);

//   const response = await server.get(`/purchase/${purchase.id}`).set('Authorization', `Bearer ${token}`);

//   expect(response.status).toBe(httpStatus.UNAUTHORIZED);
// });
// describe('when token is valid', () => {
// it('should respond with status 400 for invalid id', async () => {
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
//   await createCartItem(product, cart);
//   const purchase = await createPurchase(user, cart);
//   const inexistentId = purchase.id + 1;

//   const response = await server.get(`/purchase/${inexistentId}`).set('Authorization', `Bearer ${token}`);

//   expect(response.status).toEqual(httpStatus.NOT_FOUND);
// });
//     it('should respond with status 200 with valid id and beeing an admin', async () => {
//       const userbody = {
//         email: faker.internet.email(),
//         password: faker.internet.password(6),
//       };
//       const user = await createUserIsNotOwner(userbody);
//       await server.post('/auth/sign-in').send(userbody);
//       const token = await generateValidToken(user);
//       const category = await createCategories();
//       const tag = await createTags();
//       const product = await createProductWithEmphasisAndLaunch(category, tag);
//       const cart = await cartRepository.findByUserId(user.id);
//       await createCartItem(product, cart);
//       const purchase = await createPurchase(user, cart);

//       const response = await server.get(`/purchase/${purchase.id}`).set('Authorization', `Bearer ${token}`);

//       expect(response.status).toEqual(httpStatus.OK);
//     });
//   });
//});
