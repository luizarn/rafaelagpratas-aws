import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import {
  createCategories,
  createProduct,
  createProductWithEmphasisAndLaunch,
  createTags,
  createUserIsNotOwner,
  createUserIsOwner,
} from '../factories';
import { cleanDb, generateValidToken, generateValidTokenWhenAdmin } from '../helpers';
// eslint-disable-next-line import/no-unresolved
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /products/categories', () => {
  it('should respond with empty array when there are no categories created', async () => {
    const response = await server.get('/products/categories');

    expect(response.body).toEqual([]);
  });

  // it('should respond with status 200 and with existing Categories data', async () => {
  //   const categories = await createCategories();

  //   const response = await server.get('/products/categories');

  //   expect(response.status).toBe(httpStatus.OK);
  //   expect(response.body).toEqual([
  //     {
  //       id: categories.id,
  //       title: categories.title,
  //       createdAt: categories.createdAt.toISOString(),
  //       updatedAt: categories.updatedAt.toISOString(),
  //     },
  //   ]);
  // });
});

describe('GET /products/tags', () => {
  it('should respond with empty array when there are no tags created', async () => {
    const response = await server.get('/products/tags');

    expect(response.body).toEqual([]);
  });

  it('should respond with status 200 and with existing tags data', async () => {
    const tags = await createTags();

    const response = await server.get('/products/tags');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: tags.id,
        title: tags.title,
        createdAt: tags.createdAt.toISOString(),
        updatedAt: tags.updatedAt.toISOString(),
      },
    ]);
  });
});

// describe('GET /products/emphasis', () => {
//   // it('should respond with empty array when there are no products with emphasis', async () => {
//   //   const category = await createCategories();
//   //   const tag = await createTags();
//   //   await createProduct(category, tag);

//   //   const response = await server.get('/products/empashis');

//   //   expect(response.body).toEqual({
//   //     message: 'No result for this search!',
//   //   });
//   // });

//   it('should respond with status 200 and with existing products with emphasis data', async () => {
//     const category = await createCategories();
//     const tag = await createTags();

//     const productsEmphasis = await createProductWithEmphasisAndLaunch(category, tag);

//     const response = await server.get('/products/emphasis');

//     expect(response.status).toBe(httpStatus.OK);
//     expect(response.body).toEqual([
//       {
//         id: productsEmphasis.id,
//         title: productsEmphasis.title,
//         description: productsEmphasis.description,
//         price: productsEmphasis.price.toString(),
//         publicUrl: productsEmphasis.publicUrl,
//         size: productsEmphasis.size,
//         categoryId: productsEmphasis.categoryId,
//         tagId: productsEmphasis.tagId,
//         quantity: productsEmphasis.quantity,
//         emphasis: productsEmphasis.emphasis,
//         launch: productsEmphasis.launch,
//         createdAt: productsEmphasis.createdAt.toISOString(),
//         updatedAt: productsEmphasis.updatedAt.toISOString(),
//       },
//     ]);
//   });
// });

describe('GET /products/launch', () => {
  it('should respond with empty array when there are no products in launch', async () => {
    const category = await createCategories();
    const tag = await createTags();
    await createProduct(category, tag);

    const response = await server.get('/products/launch');

    expect(response.body).toEqual([]);
  });

  it('should respond with status 200 and with existing products in launch data', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const productsLaunch = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.get('/products/launch');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: productsLaunch.id,
        title: productsLaunch.title,
        description: productsLaunch.description,
        price: productsLaunch.price.toString(),
        publicUrl: productsLaunch.publicUrl,
        size: productsLaunch.size,
        categoryId: productsLaunch.categoryId,
        tagId: productsLaunch.tagId,
        quantity: productsLaunch.quantity,
        emphasis: productsLaunch.emphasis,
        launch: productsLaunch.launch,
        createdAt: productsLaunch.createdAt.toISOString(),
        updatedAt: productsLaunch.updatedAt.toISOString(),
      },
    ]);
  });
});

describe('GET /products/:category', () => {
  it('should respond with status 404 for invalid category id', async () => {
    const category = await createCategories();
    const tag = await createTags();

    await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.get('/products/teste');

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
  it('should respond with status 200 and with product data', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.get(`/products/${category.title}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        publicUrl: product.publicUrl,
        size: product.size,
        categoryId: product.categoryId,
        tagId: product.tagId,
        quantity: product.quantity,
        emphasis: product.emphasis,
        launch: product.launch,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      },
    ]);
  });
});

describe('GET /products/category/:title', () => {
  // it('should respond with status 404 for no given title', async () => {
  //   const category = await createCategories();
  //   const tag = await createTags();

  //   await createProductWithEmphasisAndLaunch(category, tag);

  //   const response = await server.get('/products/category/');

  //   expect(response.status).toEqual(httpStatus.NOT_FOUND);
  // });
  it('should respond with status 404 for invalid title', async () => {
    const category = await createCategories();
    const tag = await createTags();

    await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.get('/products/category/teste');

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and with product data', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.get(`/products/category/${product.title}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      price: product.price.toString(),
    });
  });
});

describe('post /products/admin', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/products/admin');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user is not the admin', async () => {
      const user = await createUserIsNotOwner();
      const token = await generateValidToken(user);
      const category = await createCategories();
      const tag = await createTags();
      const body = {
        title: faker.name.findName(),
        description: faker.lorem.sentence(),
        price: faker.datatype.number(),
        categoryId: category.id,
        tagId: tag.id,
        quantity: faker.datatype.number(),
        emphasis: true,
        launch: false,
      };

      const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
});
// it('should respond with status 400 with a invalid body', async () => {
//   const user = await createUserIsOwner();
//   const token = await generateValidTokenWhenAdmin(user);
//   const category = await createCategories();
//   const tag = await createTags();
//   const body = {
//     description: faker.lorem.sentence(),
//     price: faker.datatype.number(),
//     categoryId: category.id,
//     tagId: tag.id,
//     quantity: faker.datatype.number(),
//     emphasis: true,
//     launch: false,
//   };

//   const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.BAD_REQUEST);
// });

// it('should respond with status 409 for duplicate title', async () => {
//   const user = await createUserIsOwner();
//   const token = await generateValidTokenWhenAdmin(user);
//   const category = await createCategories();
//   const tag = await createTags();
//   const product = await createProductWithEmphasisAndLaunch(category, tag);
//   const body = {
//     title: product.title,
//     description: faker.lorem.sentence(),
//     price: faker.datatype.number(),
//     categoryId: category.id,
//     tagId: tag.id,
//     quantity: faker.datatype.number(),
//     emphasis: true,
//     launch: false,
//   };

//   const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.CONFLICT);
// });
// it('should respond with status 409 for maximum limit Emphasis', async () => {
//   const user = await createUserIsOwner();
//   const token = await generateValidTokenWhenAdmin(user);
//   const category = await createCategories();
//   const tag = await createTags();
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   const body = {
//     title: faker.name.findName(),
//     description: faker.lorem.sentence(),
//     price: faker.datatype.number(),
//     categoryId: category.id,
//     tagId: tag.id,
//     quantity: faker.datatype.number(),
//     emphasis: true,
//     launch: false,
//   };

//   const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.CONFLICT);
// });

// it('should respond with status 409 for maximum limit Launch', async () => {
//   const user = await createUserIsOwner();
//   const token = await generateValidTokenWhenAdmin(user);
//   const category = await createCategories();
//   const tag = await createTags();
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   await createProductWithEmphasisAndLaunch(category, tag);
//   const body = {
//     title: faker.name.findName(),
//     description: faker.lorem.sentence(),
//     price: faker.datatype.number(),
//     categoryId: category.id,
//     tagId: tag.id,
//     quantity: faker.datatype.number(),
//     emphasis: false,
//     launch: true,
//   };

//   const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.CONFLICT);
// });

// it('should respond with status 201 with a valid body', async () => {
//   const user = await createUserIsOwner();
//   const token = await generateValidTokenWhenAdmin(user);
//   const category = await createCategories();
//   const tag = await createTags();
//   const body = {
//     title: faker.name.findName(),
//     description: faker.lorem.sentence(),
//     price: faker.datatype.number(),
//     categoryId: category.id,
//     tagId: tag.id,
//     quantity: faker.datatype.number(),
//     emphasis: true,
//     launch: false,
//   };

//   const response = await server.post('/products/admin').set('Authorization', `Bearer ${token}`).send(body);

//   expect(response.status).toEqual(httpStatus.CREATED);
// });

describe('put /products/admin/:id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const product = await createProductWithEmphasisAndLaunch(category, tag);
    const response = await server.put(`/products/admin/${product.id}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.put(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.put(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user is not the admin', async () => {
      const user = await createUserIsNotOwner();
      const token = await generateValidToken(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);
      const body = {
        updatedFileds: {
          title: faker.name.findName(),
          description: faker.lorem.sentence(),
          price: faker.datatype.number(),
          categoryId: category.id,
          tagId: tag.id,
          quantity: faker.datatype.number(),
          emphasis: true,
          launch: false,
        },
      };

      const response = await server
        .put(`/products/admin/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 400 with no body', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);

      const response = await server.put(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`).send();

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    // it('should respond with status 404 for invalid id', async () => {
    //   const user = await createUserIsOwner();
    //   const token = await generateValidTokenWhenAdmin(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const requestBody = {
    //     updatedFields: {
    //       title: faker.name.findName(),
    //       description: faker.lorem.sentence(),
    //       price: faker.datatype.number(),
    //       categoryId: category.id,
    //       tagId: tag.id,
    //       quantity: faker.datatype.number(),
    //       emphasis: true,
    //       launch: false,
    //     },
    //   };
    //   const invalidId = product.id + 1;
    //   console.log(invalidId);

    //   const response = await server
    //     .put(`/products/admin/${invalidId}`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .send(requestBody);

    //   expect(response.status).toEqual(httpStatus.NOT_FOUND);
    // });

    it('should respond with status 200 with a valid body', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);
      const requestBody = {
        updatedFields: {
          title: faker.name.findName(),
          description: faker.lorem.sentence(),
          price: faker.datatype.number(),
          categoryId: category.id,
          tagId: tag.id,
          quantity: faker.datatype.number(),
          emphasis: true,
          launch: false,
        },
      };

      const response = await server
        .put(`/products/admin/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(requestBody);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
describe('delete /products/admin/:id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const product = await createProductWithEmphasisAndLaunch(category, tag);
    const response = await server.delete(`/products/admin/${product.id}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.delete(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.delete(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user is not the admin', async () => {
      const user = await createUserIsNotOwner();
      const token = await generateValidToken(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);

      const response = await server.delete(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    // it('should respond with status 404 for invalid id', async () => {
    //   const user = await createUserIsOwner();
    //   const token = await generateValidTokenWhenAdmin(user);
    //   const category = await createCategories();
    //   const tag = await createTags();
    //   const product = await createProductWithEmphasisAndLaunch(category, tag);
    //   const invalidId = product.id + 1;

    //   const response = await server.delete(`/products/admin/${invalidId}`).set('Authorization', `Bearer ${token}`);

    //   expect(response.status).toEqual(httpStatus.NOT_FOUND);
    // });

    it('should respond with status 200 with valid id and beeing an admin', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);

      const response = await server.delete(`/products/admin/${product.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe('put /products/updateByCart/:id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const category = await createCategories();
    const tag = await createTags();

    const product = await createProductWithEmphasisAndLaunch(category, tag);
    const response = await server.put(`/products/updateByCart/${product.id}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.put(`/products/updateByCart/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUserIsNotOwner();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const category = await createCategories();
    const tag = await createTags();
    const product = await createProductWithEmphasisAndLaunch(category, tag);

    const response = await server.put(`/products/updateByCart/${product.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 with no body', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);

      const response = await server
        .put(`/products/updateByCart/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 404 for invalid id', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);
      const requestBody = {
        quantityChange: 1,
      };
      const invalidId = product.id + 1;
      console.log(invalidId);

      const response = await server
        .put(`/products/admin/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(requestBody);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 200 with a valid body', async () => {
      const user = await createUserIsOwner();
      const token = await generateValidTokenWhenAdmin(user);
      const category = await createCategories();
      const tag = await createTags();
      const product = await createProductWithEmphasisAndLaunch(category, tag);
      const body = {
        quantityChange: 1,
      };

      const response = await server
        .put(`/products/updateByCart/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
