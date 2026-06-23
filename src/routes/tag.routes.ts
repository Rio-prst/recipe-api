import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { 
  createTag, 
  getTags, 
  attachTag, 
  detachTag, 
  getRecipesByTag 
} from '../controllers/tag.controller';

const tagRouter = Router();

tagRouter.post('/tags', requireAuth, createTag);
tagRouter.get('/tags', getTags);
tagRouter.post('/recipes/:recipeId/tags', requireAuth, attachTag);
tagRouter.delete('/recipes/:recipeId/tags/:tagId', requireAuth, detachTag);
tagRouter.get('/tags/:slug/recipes', getRecipesByTag);

export default tagRouter;