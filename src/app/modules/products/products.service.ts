/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import IPaginationOption from '../../../interfaces/pagination';
import {
  IProduct,
  IProductFilters,
  productSearchableFields,
} from './products.interface';
import { Products } from './products.model';
const createProduct = async (productData: IProduct) => {
  const result = await Products.create(productData);
  return result;
};

const getAllProducts = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOption
) => {
  const { searchTerm, ...filtersData } = filters;
  const { skip, sortBy, sortOrder, limit, maxPrice, page, minPrice } =
    paginationHelper.calculatePagination(paginationOptions);

  const query: any = {};
  const andCondition = [];

  if (minPrice) {
    andCondition.push({ price: { $gte: minPrice } });
  }
  if (maxPrice) {
    andCondition.push({ price: { $lte: maxPrice } });
  }

  if (andCondition.length > 0) {
    query.$and = andCondition;
  }
  if (searchTerm) {
    andCondition.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Products.find(whereCondition)
    .sort(sortCondition)
    .limit(limit)
    .skip(skip);

  const total = await Products.countDocuments(whereCondition);
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

export const ProductService = { getAllProducts, createProduct };
