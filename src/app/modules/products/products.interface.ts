import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  price: number;
  original_price: number;
  description: string;
  category: string[];
  size: string[];
  images: { img: string }[];
  subTitle: string;
  thumbnail: string;
};

export type ProductModel = Model<IProduct, Record<string, undefined>>;

export type IProductFilters = {
  searchTerm?: string;
  name?: string;
  price?: number;
  original_price?: number;
  description?: string;
  size?: string;
  category?: 'Jordan' | 'Sneakers' | 'Running Shoes' | 'Volleyball Shoes';
  image?: string;
  subTitle?: string;
};

export const productSearchableFields = [
  'name',
  'price',
  'original_price',
  'category',
  'size',
];

export const productFilterableFields = [
  'searchTerm',
  'name',
  'price',
  'original_price',
  'category',
  'size',
];
