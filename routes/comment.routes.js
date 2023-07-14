import express from 'express';
import { registerValidation, loginValidation } from '../validations.js';
import { handleValidationErrors, checkAuth } from '../utils/index.js';
import { CommentController } from '../controllers/index.js';

const router = express.Router();

router.get('/posts/:id/comments', CommentController.getAll);
router.post('/posts/:id/comments', checkAuth,  CommentController.create);
router.delete('/posts/:id/comments/:id', checkAuth, CommentController.remove);
router.patch('/:id', checkAuth, CommentController.update);

export default router;