import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import productsService from '../services/products-service';
import { CustomRequest } from '../middlewares/upload-image-middleware';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';

export async function getCategories(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const categories = await productsService.getCategories();
    return res.status(httpStatus.OK).send(categories);
  } catch (e) {
    next(e);
  }
}

export async function getTags(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const tags = await productsService.getTags();
    return res.status(httpStatus.OK).send(tags);
  } catch (e) {
    next(e);
  }
}

export async function getProducts(req: CustomRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const products = await productsService.getProducts();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function createProduct(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { title, description, price, categoryId, tagId, quantity, emphasis, launch } = req.body;
    const { publicUrl } = req;
    console.log(emphasis);

    const product = await productsService.createProduct({
      title,
      description,
      quantity: Number(quantity),
      price: new Prisma.Decimal(price),
      categoryId: Number(categoryId),
      tagId: Number(tagId),
      publicUrl,
      emphasis: JSON.parse(emphasis),
      launch: JSON.parse(launch),
    });
    return res.status(httpStatus.CREATED).json({
      id: product.id,
      title: product.title,
    });
  } catch (error) {
    next(error);
  }
}

export async function listProductsByCategory(req: Request, res: Response, next: NextFunction) {
  const { category } = req.params;

  try {
    const products = await productsService.listProductsByCategory(category);
    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    next(error);
  }
}

export async function listProductByTitle(req: Request, res: Response, next: NextFunction) {
  const { title } = req.params;
  if (!title) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const product = await productsService.listProductByTitle(title);
    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req: CustomRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  console.log(id);
  const { updatedFields } = req.body;
  if (!updatedFields) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const product = await productsService.updateProduct(Number(id), updatedFields);
    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req: CustomRequest, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const product = await productsService.deleteProduct(Number(id));
    return res.status(httpStatus.OK).send(product);
  } catch (e) {
    next(e);
  }
}

export async function listProductsByEmphasis(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const products = await productsService.listProductsByEmphasis();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function listProductsByLaunch(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const products = await productsService.listProductsByLaunch();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function updateProductByCart(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { id } = req.params;
  const { quantityChange } = req.body;
  if (!quantityChange) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const product = await productsService.updateProductByCart(Number(id), Number(quantityChange));
    return res.status(httpStatus.OK).send(product);
  } catch (e) {
    next(e);
  }
}
