import express from 'express';
import { ProductsController } from './products.controller';

const router = express.Router();

router.post('/create-product', ProductsController.createProduct);
router.get('/', ProductsController.getAllProducts);

export const ProductRoutes = router;
