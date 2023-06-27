import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { IProduct, productSearchableFields } from './products.interface';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { ProductService } from './products.service';

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productSearchableFields);
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
  ]);
  const result = await ProductService.getAllProducts(
    filters,
    paginationOptions
  );
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved  successfully',
    meta: result.meta,
    data: result.data,
  });
});
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const result = await ProductService.createProduct(productData);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Created successfully',
    data: result,
  });
});

export const ProductsController = {
  getAllProducts,
  createProduct,
};
