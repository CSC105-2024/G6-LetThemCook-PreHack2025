import type { Context } from "hono";
import { db } from "../index.ts";
import * as postModel from "../model/post.model.ts";
import { title } from "process";
import { uploadFile } from "../utils/uploadImage.ts";
type recipeBody = {
  userId: number;
  title: string;
  description: string;
  image: string;
  category: string;
  nationality: string;
  ingredients: string[];
  steps: string[];
};
export const getRecipe = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ success: false, msg: "Unauthorized" }, 401);
    }
    const recipe = await postModel.getRecipe(userId);

    return c.json({
      success: true,
      data: recipe,
      msg: "Successfully fetched user posts",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};

export const createRecipe = async (c: Context) => {
  try {
    const form = await c.req.formData();

    const userIdStr = form.get("userId");
    const userId = Number(userIdStr);

    if (!userId || isNaN(userId)) {
      return c.json({ success: false, msg: "Invalid or missing userId" }, 400);
    }

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const image = form.get("image") as File | null;
    const category = form.get("category") as string;
    const nationality = form.get("nationality") as string;

    const ingredients: string[] = [];
    const steps: string[] = [];

    for (const [key, value] of form.entries()) {
      if (key.startsWith("ingredients[")) {
        ingredients.push(value as string);
      }
      if (key.startsWith("steps[")) {
        steps.push(value as string);
      }
    }

    const imagePath = image ? await uploadFile(image) : null;

    const recipe = await postModel.addRecipe(
      userId,
      title,
      description,
      imagePath,
      ingredients,
      category,
      nationality,
      steps
    );

    return c.json({
      success: true,
      data: recipe,
      msg: "Created new recipe",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal server error: ${e}`,
      },
      500
    );
  }
};
