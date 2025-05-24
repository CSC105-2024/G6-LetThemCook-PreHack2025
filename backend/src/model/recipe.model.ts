
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
    const deletedRecipe = await db.recipe.delete({
        where:{id}
    })
    return deletedRecipe;
}

export const getRecipeById = async (id:string)=>{
    const getRecipeById = await db.recipe.findUnique({
        where:{id}
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


