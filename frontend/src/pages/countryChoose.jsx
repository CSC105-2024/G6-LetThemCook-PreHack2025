import { useLocation } from "react-router-dom";
import NavBar from "../components/navbar";
import FilterSection from "../components/FilterSection";
import { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchAllRecipe } from "../services/getAllRecipeService";

function CountryChoosePage() {
  const [allFoods,setAllFoods] = useState([]);
  useEffect(()=>{
    const loadAllRecipe = async ()=>{
      try{
        const allRecipe = await fetchAllRecipe();
        setAllFoods(allRecipe);
      }catch(error){
        console.error("Error fetching recipes:", error);
      }
    }
    loadAllRecipe();
  },[])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const selectedNationalities = queryParams.get("nationalities")?.split(",").filter(Boolean) || [];
  const selectedCategories = queryParams.get("categories")?.split(",").filter(Boolean) || [];

  const filteredFoods = useMemo(() => {
    return allFoods.filter((food) => {
      const hasnationality = selectedNationalities.length > 0 ;
      const hasCategory = selectedCategories.length > 0;
      const matchNationality = selectedNationalities.includes(food.nationality);
      const matchCategory = selectedCategories.includes(food.category);
      if(!hasnationality && !hasCategory){
        return true;
      }
      if(hasnationality && !hasCategory ){
        return matchNationality;
      }
      if(hasCategory && !hasnationality){
        return matchCategory;
      }
      return matchNationality&&matchCategory;
    });
  }, [selectedNationalities, selectedCategories]);

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
  const foodsToShow = filteredFoods.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <>
      <NavBar />
      <div className="px-6 md:px-20 py-10 flex flex-col justify-center items-center">
        <FilterSection isOnCountryChoosePage={true} />

        {filteredFoods.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">
            No recipes match the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center mt-10">
            {foodsToShow.map((food, index) => (
              <div key={startIndex + index} className="flex flex-col items-center w-full max-w-[450px]">
                <div className="w-full max-w-[450px] h-[240px] overflow-hidden rounded-xl shadow-md">
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

export default CountryChoosePage;
