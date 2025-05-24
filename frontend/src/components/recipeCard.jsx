import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const recipes = [
  { title: "Spaghetti with Tomato Sauce", image: "/Homepage/ItalianF.svg" },
  { title: "Pancake", image: "/Homepage/Pancake.svg" },
  { title: "Egg", image: "/Homepage/lasagna.svg" },
];

const RecipeCard = () => {
  const carouselRef = useRef();

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (!current) return;
    const scrollAmount = 300;
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2">
        < FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth px-10"
      >
        {recipes.map((item, index) => (
          <div key={index} className="min-w-[180px] bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
            <div className="text-center p-2 text-sm font-medium">{item.title}</div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2">
        < FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default RecipeCard;
