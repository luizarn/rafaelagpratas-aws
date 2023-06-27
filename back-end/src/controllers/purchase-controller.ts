import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';
import purchaseService from '../services/purchase-service';

export async function createPurchase(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { cartId, total } = req.body;

    const purchase = await purchaseService.create({
      total: new Prisma.Decimal(total),
      userId: Number(userId),
      cartId: Number(cartId),
    });
    return res.status(httpStatus.CREATED).json({
      id: purchase.id,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(console.log(error));
  }
}

export async function listPurchaseById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!id) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const purchase = await purchaseService.listPurchaseById(Number(id));
    return res.status(httpStatus.OK).send(purchase);
  } catch (error) {
    next(error);
  }
}
