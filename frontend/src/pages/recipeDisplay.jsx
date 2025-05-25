import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../services/getRecipeById";
import defaulticon from "/userProfile/defaulticon.png";

function RecipeDisplay() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const getRecipe = await fetchRecipeById(id);
        setRecipe(getRecipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div className="p-6 text-center">Loading recipe...</div>;
  }
  console.log(recipe)
  return (
    <div className="min-h-screen bg-[#E9E5DC] p-6 md:flex flex-col justify-center items-center">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-md p-6 md:p-18">
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <img
            src={`http://localhost:3000${recipe.image}`}
            alt="Recipe"
            className="w-full md:w-64 rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-gray-600 mt-2">{recipe.description}</p>
            <div className="flex items-center mt-4 gap-2">
              <img
                alt="User"
                src={recipe.user?.profileImage || defaulticon}
                className="w-8 h-8 rounded-full"
              />
              <p className="font-semibold">{recipe.user?.username}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside">
              {(recipe.ingredients ?? []).map((item,index)=>(
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 mt-10 md:mt-0">
              Directions
            </h2>
            <ol className="list-decimal">
              {(recipe.steps ?? []).map((item,index)=>(
                <li key={index}>{item.Step_description}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDisplay;
