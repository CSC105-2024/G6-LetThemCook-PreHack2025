
import { create } from "domain";
import { db } from "../index.ts";
export const getRecipe = async (userId:number)=>{
    const posts = await db.recipe.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:'desc',
        },
        include:{
            ingredients:true,
            steps:true
        }
    })
    return posts;
}

export const addRecipe = async(
    userId:number,
    title:string,
    description:string,
    image:string | null,
    ingredients:string[],
    category:string,
    nationality: string,
    steps:string[]
)=>{
    return db.recipe.create({
       data:{
        user:{
            connect:{id:userId}
        },
        title,
        description,
        category,
        nationality,
        image: image || null,
        ingredients:{
            create: ingredients.map((name)=>({name}))
        },
        steps:{
            create: steps.map((step)=>({Step_description: step}))
        }

       },
       include:{
        ingredients:true,
        steps:true
       }
    })
}

export const deleteRecipe = async (id:string)=>{
    await db.ingredients.deleteMany({
        where:{recipeId:id},
        
    })
    await db.steps.deleteMany({
        where:{recipeId:id}
    })
    const deletedRecipe = await db.recipe.delete({
        where:{id}
    })
    
    return deletedRecipe;
}

export const getRecipeById = async (id:string)=>{
    const getRecipeById = await db.recipe.findUnique({
        where:{id},
        include:{
            ingredients:true,
            steps:true,
            user:true,
        }
    }) 
    return getRecipeById;
}
export const getAllRecipes = async ()=>{
    const allPost = await db.recipe.findMany({
        include:{
            user:true,
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return allPost;
}

export const updateRecipe = async(
    id:string,
    data:{
        title?:string,
        description?: string;
        image?: string | null;
        category?: string;
        nationality?: string;
        ingredients?: string[];
        steps?: string[];
    }
)=>{
    if (data.ingredients) {
    await db.ingredients.deleteMany({ where: { recipeId: id } });
  }
  if (data.steps) {
    await db.steps.deleteMany({ where: { recipeId: id } });
  }
  const updated = await db.recipe.update({
    where:{id},
    data:{
        title:data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        nationality: data.nationality,
        ingredients: data.ingredients
        ?{ create: data.ingredients.map((name)=>({name}))}:
        undefined,
        steps: data.steps
        ? { create: data.steps.map((step) => ({ Step_description: step })) }
        : undefined,
    },
    include:{
       ingredients: true,
       steps: true, 
    }
  })
  return updated;
}
