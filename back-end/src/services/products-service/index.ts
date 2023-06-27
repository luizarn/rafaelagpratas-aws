import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import productsRepository from '../..//repositories/products-repository';
import { notFoundError } from '../../errors/not-found-error';
import { badRequestError } from '../../errors/bad-request-error';
import { duplicatedTitleError, maximumLimitEmphasisError, maximumLimitLaunchError } from './errors';

export type ProductParams = Omit<Product, 'createdAt' | 'updatedAt' | 'id' | 'size'>;

interface UpdatedFields {
  emphasis?: boolean;
  launch?: boolean;
}

async function getCategories() {
  const categories = await productsRepository.getCategories();

  if (!categories) throw notFoundError();

  return categories;
}

async function getTags() {
  const tags = await productsRepository.getTags();

  if (!tags) throw notFoundError();

  return tags;
}

async function getProducts() {
  const products = await productsRepository.getProducts();

  if (!products) throw notFoundError();

  return products;
}

export async function createProduct({
  title,
  description,
  price,
  categoryId,
  tagId,
  publicUrl,
  quantity,
  emphasis,
  launch,
}: ProductParams): Promise<Product> {
  await validateUniqueTitleOrFail(title);
  console.log('a primeira tentativa');
  console.log(emphasis);
  if (emphasis === true) {
    await validateLimitEmphasis();
  }

  if (launch === true) {
    await validateLimitLaunch();
  }
  console.log('a segunda tentativa');
  console.log(emphasis);
  const priceNumber = new Decimal(price).toNumber();

  const result = await productsRepository.create(
    title,
    description,
    priceNumber,
    categoryId,
    tagId,
    publicUrl,
    quantity,
    emphasis,
    launch,
  );
  console.log(result);
  return result;
}

async function validateUniqueTitleOrFail(title: string) {
  const productWithSameEmail = await productsRepository.findByTitle(title);
  if (productWithSameEmail) {
    throw duplicatedTitleError();
  }
}

async function listProductsByCategory(category: string) {
  const products = await productsRepository.listProductsByCategory(category);

  if (!products) {
    throw notFoundError();
  }
  return products;
}

async function listProductByTitle(title: string) {
  const product = await productsRepository.listProductByTitle(title);

  if (!product) throw notFoundError();

  return product;
}

async function updateProduct(id: number, updatedFields: UpdatedFields) {
  const productUpdated = await productsRepository.updateProduct(id, updatedFields);

  if (!productUpdated) {
    throw notFoundError();
  }

  return productUpdated;
}

async function deleteProduct(id: number) {
  const product = await productsRepository.deleteProduct(id);

  if (!product) throw notFoundError();

  return product;
}

async function listProductsByEmphasis() {
  const products = await productsRepository.listProductsByEmphasis();

  if (!products) throw notFoundError();

  return products;
}

async function listProductsByLaunch() {
  const products = await productsRepository.listProductsByLaunch();

  if (!products) throw notFoundError();

  return products;
}

async function validateLimitEmphasis() {
  const productsWithEmphasis = await listProductsByEmphasis();
  const emphasisLimit = 12;
  console.log(productsWithEmphasis.length);

  if (productsWithEmphasis.length >= emphasisLimit) {
    throw maximumLimitEmphasisError();
  }
  console.log('validou');
}
async function validateLimitLaunch() {
  const productsWithLaunch = await listProductsByLaunch();
  const lauchLimit = 12;

  if (productsWithLaunch.length >= lauchLimit) {
    throw maximumLimitLaunchError();
  }
}

async function updateProductByCart(id: number, quantityChange: number) {
  const productUpdated = await productsRepository.updateProductByCart(id, quantityChange);

  if (!productUpdated) throw badRequestError();

  return productUpdated;
}

const productsService = {
  createProduct,
  listProductsByCategory,
  listProductByTitle,
  updateProduct,
  deleteProduct,
  getCategories,
  getTags,
  getProducts,
  listProductsByLaunch,
  listProductsByEmphasis,
  validateLimitEmphasis,
  validateLimitLaunch,
  updateProductByCart,
};

export * from './errors';
export default productsService;
