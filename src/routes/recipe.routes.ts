import { Router } from 'express';
import { createRecipe, 
  getAllRecipes, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe 
} from '../controllers/recipe.controller';
import { requireAuth } from '../middlewares/auth';

const recipeRouter = Router();

recipeRouter.post('/', requireAuth, createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipeById);
recipeRouter.patch('/:id', requireAuth, updateRecipe);
recipeRouter.delete('/:id', requireAuth, deleteRecipe);

export default recipeRouter;