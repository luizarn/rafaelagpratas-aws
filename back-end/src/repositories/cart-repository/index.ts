import { CartItem, Prisma } from '@prisma/client';
import productsRepository from '../products-repository';
import { notFoundError } from '../../errors/not-found-error';
import { prisma } from '../../config';

export type CartItemParams = Omit<CartItem, 'createdAt' | 'updatedAt' | 'id'>;

async function create(userId: number) {
  return await prisma.cart.create({
    data: {
      userId,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.cart.findFirst({
    where: {
      userId,
    },
  });
}

async function createOrUpdateCartItem(cartId: number, productId: number, quantity: number) {
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      productId: productId,
    },
  });

  let result;

  if (existingCartItem) {
    result = await prisma.cartItem.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: quantity,
      },
    });
    await productsRepository.updateProductByCart(productId, existingCartItem.quantity);
  } else {
    result = await prisma.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      },
    });
  }

  return result;
}

async function listCartItems(cartId: number) {
  return await prisma.cartItem.findMany({
    where: {
      cartId,
    },
    include: {
      product: true,
    },
  });
}

async function deleteCartItem(id: number, cartId: number) {
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    throw notFoundError();
  }

  const cartItemToDelete = cart.items.find((item) => item.id === id);

  if (!cartItemToDelete) {
    throw notFoundError();
  }

  return await prisma.cartItem.delete({
    where: {
      id,
    },
  });
}

const cartRepository = {
  create,
  findByUserId,
  createOrUpdateCartItem,
  listCartItems,
  deleteCartItem,
};

export default cartRepository;
