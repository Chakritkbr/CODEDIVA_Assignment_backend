import express, { Router } from 'express';
import productController from './productController';

const router: Router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);

export default router;
