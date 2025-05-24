import React, { useState, useEffect } from "react";
import { fetchAllRecipe } from "../services/getAllRecipeService";
const allMenus = [
  { id: 1, name: "Lasagna", image: "/Homepage/lasagna.svg" },
  { id: 2, name: "Pancake", image: "/Homepage/Pancake.svg" },
  { id: 3, name: "Ramen", image: "/Homepage/Ramen.svg" },
  { id: 4, name: "Macaron", image: "/Homepage/Macaron.svg" },
  { id: 5, name: "Phatkaphrao", image: "/Homepage/ThaiF.svg" },
  { id: 6, name: "Tteok-bokki", image: "/Homepage/KoreanF.svg" },
  { id: 7, name: "Miso Soup", image: "/Homepage/Miso-Soup.svg" },
  { id: 8, name: "Fried Pork Belly", image: "/Homepage/Fried-Pork-Belly.svg" },
];

function RecommendedMenu() {
  const [recommendedMenus, setRecommendedMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    //setRecommendedMenus(getRandomMenus());
    const loadAllRecipe = async () =>{
      try{
        const allRecipe = await fetchAllRecipe();
        const shffled = allRecipe.sort(()=> 0.5 - Math.random()).slice(0,4)
        setRecommendedMenus(shffled);
      }catch(error){
        console.error("Error fetching recipes:", error);
      }
    }
    loadAllRecipe();

    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 2);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(recommendedMenus.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleItems = recommendedMenus.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Looking for Ideas? Try These Recommended Recipes!
      </h2>

      <div className="relative flex justify-center items-center w-full max-w-6xl mx-auto">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-30 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full"
        >
          ❮
        </button>

        <div className="flex gap-6 justify-center w-full px-4 md:px-10 transition-all duration-300">
          {visibleItems.map((menu) => (
            <div
              key={menu.id}
              className="flex flex-col items-center w-full max-w-[300px] md:max-w-[400px]"
            >
              <img
                src={`http://localhost:3000${menu.image}`} 
                alt={menu.title}
                className="w-100 h-auto aspect-[4/3] object-cover rounded-lg shadow-md"
              />
              <p className="mt-3 font-semibold text-center text-lg">{menu.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-30 absolute top-1/2 right-0 -translate-y-1/2 translate-x-full"
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default RecommendedMenu;
