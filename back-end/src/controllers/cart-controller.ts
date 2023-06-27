import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';
import cartService from '../services/cart-service';

export async function createOrUpdateCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;

    const cart = await cartService.createOrUpdateCartItem(userId, productId, quantity);
    return res.status(httpStatus.CREATED).json({ id: cart.id });
  } catch (error) {
    next(error);
  }
}

export async function getCartItems(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const cartItems = await cartService.listCartItems(userId);
    return res.status(httpStatus.OK).send(cartItems);
  } catch (error) {
    next(error);
  }
}

export async function deleteCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { userId } = req;

  try {
    const cartItem = await cartService.deleteCartItem(Number(id), userId);
    return res.status(httpStatus.OK).send(cartItem);
  } catch (error) {
    next(error);
  }
}
