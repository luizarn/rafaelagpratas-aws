import { CartItem } from '@prisma/client';
// import { duplicatedTitleError, maximumLimitEmphasisError, maximumLimitLaunchError } from './errors';
// import productsRepository from '@/repositories/products-repository';
// import { notFoundError } from '@/errors';
import cartRepository from '../..//repositories/cart-repository';
import { notFoundError } from '../../errors/not-found-error';

export type ProductParams = Omit<CartItem, 'createdAt' | 'updatedAt' | 'id'>;

export async function createOrUpdateCartItem(userId: number, productId: number, quantity: number): Promise<CartItem> {
  const cart = await validateIfHasCart(userId);

  return cartRepository.createOrUpdateCartItem(cart.id, productId, quantity);
}

export async function listCartItems(userId: number) {
  const cart = await validateIfHasCart(userId);

  const cartItems = await cartRepository.listCartItems(cart.id);

  if (!cartItems) throw notFoundError();

  return cartItems;
}

async function validateIfHasCart(userId: number) {
  const cart = await cartRepository.findByUserId(userId);
  if (!cart) throw notFoundError();
  return cart;
}

async function deleteCartItem(id: number, userId: number) {
  const cart = await cartRepository.findByUserId(userId);

  const cartItem = await cartRepository.deleteCartItem(id, cart.id);

  if (!cartItem) throw notFoundError();

  return cartItem;
}

const cartService = {
  createOrUpdateCartItem,
  listCartItems,
  deleteCartItem,
};

export default cartService;
