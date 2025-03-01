import express, { Router } from 'express';
import categoryController from './categoryController';

const router: Router = express.Router();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get(
  '/categories/:id/products',
  categoryController.getAllCategoryProducts
);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/categories/is-name-exist/:name', categoryController.isNameExist);
router.put('/categories/:id', categoryController.updateCategory);

export default router;
