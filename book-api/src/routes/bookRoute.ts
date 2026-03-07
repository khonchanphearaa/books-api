import { Router } from 'express';
import * as bookController from '../controllers/bookController.js'
import { isAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', isAdmin, bookController.addBook);
router.put('/:id', isAdmin, bookController.updateBook);
router.delete('/:id', isAdmin, bookController.deleteBook);

export default router;