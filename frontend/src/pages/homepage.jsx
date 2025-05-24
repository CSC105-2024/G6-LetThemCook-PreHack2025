import NavBar from "../components/navbar";
import FilterSection from "../components/FilterSection";
import RecommendedMenu from "../components/RecommendedMenu";
import FoodGrid from "../components/FoodGrid";

const internationalFoods = [
  { name: "Thai Food", img: "/Homepage/ThaiF.svg", slug: "thai-food" },
  { name: "Japanese Food", img: "/Homepage/JapaneseF.svg", slug: "japanese-food" },
  { name: "Italian Food", img: "/Homepage/ItalianF.svg", slug: "italian-food" },
  { name: "Korean Food", img: "/Homepage/KoreanF.svg", slug: "korean-food" },
];

const foodCategories = [
  { name: "Dessert", img: "/Homepage/Dessert.svg", slug: "dessert" },
  { name: "Fried", img: "/Homepage/Fried.svg", slug: "fried" },
  { name: "Boiled", img: "/Homepage/Boiled.svg", slug: "boiled" },
  { name: "Soup", img: "/Homepage/Soup.svg", slug: "soup" },
];

function HomePage() {
  return (
    <>
      <NavBar />
      <div className="px-10 py-6 space-y-10">
        <FilterSection />
        <RecommendedMenu />
        <FoodGrid title="International food" items={internationalFoods} />
        <FoodGrid title="Food Categories" items={foodCategories} />
      </div>
    </>
  );
}

export default HomePage;
