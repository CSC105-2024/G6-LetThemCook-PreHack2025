import { Hono } from "hono";
import * as recipeController from '../controllers/recipe.controller.ts';
import { authMiddleWare } from "../middleware/auth.middleware.ts";
export const recipeRouter = new Hono();
recipeRouter.get('/all',recipeController.getAllRecipe);
recipeRouter.use('*', authMiddleWare);
recipeRouter.get('/', recipeController.getRecipe);
recipeRouter.post('/addRecipe', recipeController.createRecipe);
