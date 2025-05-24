import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function FilterSection({ isOnCountryChoosePage }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const nationalitiesFromParams = searchParams.get("nationalities");
    const categoriesFromParams = searchParams.get("categories");

    if (nationalitiesFromParams) {
      setSelectedNationalities(nationalitiesFromParams.split(","));
    }

    if (categoriesFromParams) {
      setSelectedCategories(categoriesFromParams.split(","));
    }
  }, []);

  const handleClearAll = () => {
    setSelectedNationalities([]);
    setSelectedCategories([]);
    navigate("/homepage", { replace: true });
  };

  const handleApply = () => {
    const queryParams = new URLSearchParams({
      nationalities: selectedNationalities.join(","),
      categories: selectedCategories.join(","),
    });

    navigate(`/pages/countryChoose?${queryParams.toString()}`);
  };

  const handleCheckboxChange = (type, value) => {
    if (type === "nationality") {
      setSelectedNationalities((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className=" max-w-xl p-6 mt-10 bg-white shadow-lg rounded-lg border">
      <div>
        <h2 className="font-semibold mb-2">Nationality</h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-4">
          {["Thai", "Japanese", "Italian", "Korean"].map((n) => (
            <label
              key={n}
              className="flex items-center w-full text-sm sm:text-base min-w-[120px]"
            >
              <input
                type="checkbox"
                checked={selectedNationalities.includes(n)}
                onChange={() => handleCheckboxChange("nationality", n)}
                className="w-5 h-5 mr-2 accent-[#5C6A51]"
              />
              <span className="whitespace-nowrap">{n}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Category</h2>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-4">
          {["Dessert", "Fried", "Boiled", "Soup"].map((c) => (
            <label
              key={c}
              className="flex items-center w-full text-sm sm:text-base min-w-[120px]"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() => handleCheckboxChange("category", c)}
                className="w-5 h-5 mr-2 accent-[#5C6A51]"
              />
              <span className="whitespace-nowrap">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-4 mt-4">
        <button
          onClick={handleApply}
          className="border border-black bg-[#5C6A51] text-white px-4 py-1.5 rounded text-base hover:bg-[#4d6246]"
        >
          Apply
        </button>
        <button
          onClick={handleClearAll}
          className="border border-black bg-[#962424] text-white px-4 py-1.5 rounded text-base hover:bg-[#8f3333]"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default FilterSection;
