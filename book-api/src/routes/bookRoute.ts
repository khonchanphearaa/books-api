import { Router } from 'express';
import * as bookController from '../controllers/bookController.js'

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;