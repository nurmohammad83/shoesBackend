import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './products.interface';

const productSchema = new Schema<IProduct, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  original_price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  images: {
    type: [
      {
        img: String,
      },
    ],
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

export const Products = model<IProduct, ProductModel>(
  'Products',
  productSchema
);
