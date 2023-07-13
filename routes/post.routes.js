import express from 'express';
import { postCreateValidation } from '../validations.js';
import { handleValidationErrors, checkAuth } from '../utils/index.js';
import { PostController } from '../controllers/index.js';

const router = express.Router();

router.get('/tags', PostController.getLastTags);
router.get('/', PostController.getAll);
router.get('/posts/tags', PostController.getLastTags);
router.get('/:id', PostController.getOne);
router.post('/', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
router.delete('/:id', checkAuth, PostController.remove);
router.patch('/:id', checkAuth, postCreateValidation, PostController.update);

export default router;
