import { useParams, Link } from "react-router-dom";
import NavBar from "../components/navbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const slugToName = {
  "thai-food": "Thai Food",
  "italian-food": "Italian Food",
  "japanese-food": "Japanese Food",
  "korean-food": "Korean Food",
  "dessert": "Food Categories / Dessert",
  "fried": "Food Categories / Fried",
  "boiled": "Food Categories / Boiled",
  "soup": "Food Categories / Soup",
};

const defaultFoodData = {
  "thai-food": [
    { name: "Phat kaphrao", img: "/Homepage/ThaiF.svg" },
    { name: "Tom Yum Goong", img: "/Homepage/tom.png" },
    { name: "Mango and sticky rice", img: "/Homepage/Dessert.svg" },
  ],
  "italian-food": [
    { name: "Lasagna", img: "/Homepage/lasagna.svg" },
    { name: "Spaghetti", img: "/Homepage/ItalianF.svg" },
  ],
  "japanese-food": [
    { name: "Tempura", img: "/Homepage/Tempura.svg" },
    { name: "Ramen", img: "/Homepage/Ramen.svg" },
  ],
  "korean-food": [
    { name: "Tteok-bokki", img: "/Homepage/KoreanF.svg" },
    { name: "Kimchi", img: "/Homepage/Kimchi.svg" },
  ],
  "dessert": [
    { name: "Macaron", img: "/Homepage/Macaron.svg" },
    { name: "Pancake", img: "/Homepage/Pancake.svg" },
    { name: "Mango and sticky rice", img: "/Homepage/Dessert.svg" },
  ],
  "fried": [
    { name: "Fried Pork Belly", img: "/Homepage/Fried-Pork-Belly.svg" },
    { name: "Tempura", img: "/Homepage/Tempura.svg" },
  ],
  "boiled": [
    { name: "Tom Yum Goong", img: "/Homepage/tom.png" },
    { name: "Kai Pa-low", img: "/Homepage/Kai-Pa-low.svg" },
  ],
  "soup": [
    { name: "Miso Soup", img: "/Homepage/Miso-Soup.svg" },
    { name: "Sweet Corn Soup", img: "/Homepage/Soup.svg" },
  ],
};

const getUserFoodData = (type) => {
  const data = JSON.parse(localStorage.getItem("userFoods")) || {};
  return data[type] || [];
};

function CategoryPage() {
  const { type } = useParams();
  const userFoods = getUserFoodData(type);
  const defaultFoods = defaultFoodData[type] || [];
  const combinedFoods = [...defaultFoods, ...userFoods];
  const title = slugToName[type] || "Unknown Category";

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            {foodsToShow.map((food, index) => (
              <div key={startIndex + index} className="flex flex-col items-center w-full max-w-[450px]">
                <div className="w-full max-w-[450px] h-[240px] overflow-hidden rounded-xl shadow-md">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 font-semibold text-center">{food.name}</p>
              </div>
            ))}
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

