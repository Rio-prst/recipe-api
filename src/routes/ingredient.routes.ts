import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { 
  addIngredient, 
  getIngredients, 
  updateIngredient, 
  deleteIngredient 
} from '../controllers/ingredient.controller';

const ingredientRouter = Router();

ingredientRouter.post('/recipes/:recipeId/ingredients', requireAuth, addIngredient);
ingredientRouter.get('/recipes/:recipeId/ingredients', getIngredients);
ingredientRouter.patch('/ingredients/:id', requireAuth, updateIngredient);
ingredientRouter.delete('/ingredients/:id', requireAuth, deleteIngredient);

export default ingredientRouter;