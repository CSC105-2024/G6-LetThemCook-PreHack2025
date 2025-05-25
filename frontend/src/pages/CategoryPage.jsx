import { useParams, Link } from "react-router-dom";
import NavBar from "../components/navbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAllRecipe } from "../services/getAllRecipeService";
import { useNavigate } from 'react-router-dom';
const slugToName = {
  "thai-food": "Thai Food",
  "italian-food": "Italian Food",
  "japanese-food": "Japanese Food",
  "korean-food": "Korean Food",
  dessert: "Food Categories / Dessert",
  fried: "Food Categories / Fried",
  boiled: "Food Categories / Boiled",
  soup: "Food Categories / Soup",
};
function CategoryPage() {
  const [allFood, setAllFood] = useState([]);
  const defaultFoodData = {
    "thai-food": allFood.filter((food) => food.nationality == "Thai"),
    "italian-food": allFood.filter((food) => food.nationality == "Italian"),
    "japanese-food": allFood.filter((food) => food.nationality == "Japanese"),
    "korean-food": allFood.filter((food) => food.nationality == "Korean"),
    "dessert": allFood.filter((food) => food.category == "Dessert"),
    "fried": allFood.filter((food) => food.category == "Fried"),
    "boiled": allFood.filter((food) => food.category == "Boiled"),
    "soup": allFood.filter((food) => food.category == "Soup"),
  };

  const { type } = useParams();
  const nav = useNavigate();
  const defaultFoods = defaultFoodData[type] || [];
  const combinedFoods = [...defaultFoods];
  const title = slugToName[type] || "Unknown Category";

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const loadAllRecipe = async () => {
      try {
        const allRecipe = await fetchAllRecipe();
        setAllFood(allRecipe);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    loadAllRecipe();

    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const foodsToShow = combinedFoods.slice(startIndex, endIndex);
  const totalPages = Math.ceil(combinedFoods.length / itemsPerPage);
  return (
    <>
      <NavBar />
      <div className="px-6 md:px-20 py-10">
        <p className="text-gray-500 mb-4">
          {title.includes("Food Categories") ? (
            <>
              <Link to="/homePage" className="text-black hover:underline">
                Food Categories
              </Link>{" "}
              /{" "}
              <span className="text-black">
                {title.replace("Food Categories / ", "")}
              </span>
            </>
          ) : (
            <>
              <Link to="/homePage" className="text-black hover:underline">
                International food
              </Link>{" "}
              / <span className="text-black">{title}</span>
            </>
          )}
        </p>

        {combinedFoods.length === 0 ? (
          <p className="text-center text-gray-600">
            No recipes yet in this category.
          </p>
        ) : (
          <div className="grid-container mt-10 flex justify-center items-center">
            <div className="max-w-[800px] grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
              {foodsToShow.map((food, index) => (
                <div
                  key={startIndex + index}
                  className="flex flex-col items-center w-full max-w-[450px]"
                >
                  <div onClick={()=>nav(`/recipe/${food.id}`)} className="w-full max-w-[450px] h-[240px] overflow-hidden rounded-xl shadow-md">
                    <div className="imgbox w-100 h-full bg-cover bg-center"
                    style={{
                      backgroundImage:`url(http://localhost:3000${food.image})`
                    }}
                    >
                    </div>
                  </div>
                  <p className="mt-2 font-semibold text-center">{food.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span className="text-gray-700 font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            className="text-xl hover:scale-125 transition-transform disabled:text-gray-400"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
