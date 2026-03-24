import { Router } from "express";
import { authorController } from '../controllers/authorController.js';

const router = Router();

router.post('/', authorController.CreateAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorController.updateAuthor);

export default router;