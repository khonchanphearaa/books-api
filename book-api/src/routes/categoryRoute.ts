import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js'
import { isAdmin } from '../middlewares/auth.js';

const router = Router();

router.post('/', isAdmin, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', isAdmin, categoryController.updateCategory);
router.delete('/:id', isAdmin, categoryController.deleteCategory);

export default router;