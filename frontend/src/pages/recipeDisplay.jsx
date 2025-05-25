
function RecipeDisplay({ recipe }) {
    if (!recipe) {
    return <p min-h-screen flex >failed to download</p>; 
  }
  return (
    <>

    <div className="min-h-screen bg-[#E9E5DC] p-6 md:flex flex-col justify-center items-center">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-md p-6 md:p-18 ">
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <img src={recipe.imageUrl} alt="Recipe" className="w-full md:w-64 rounded-md" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-gray-600 mt-2">{recipe.description}</p>
            <div className="flex items-center mt-4 gap-2">
              <img src={recipe.author.profileUrl} alt="User" className="w-8 h-8 rounded-full" />
              <p className="font-semibold">{recipe.author.username}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-2 ">Ingredients</h2>
            <ul className="ml-5 text-sm lg:text-base space-y-1 list-disc list-inside">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            
          </div>
              
          <div>
            <h2 className="text-xl font-semibold mb-2 mt-10 md:mt-0 " >Directions</h2>
            <ol className="list-decimal list-inside text-sm lg:text-base  space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default RecipeDisplay;
